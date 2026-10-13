import {
  Component,
  inject,
  signal,
  OnInit,
  ChangeDetectionStrategy,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { OperacionService } from "../../core/services/operacion.service";
import { EntidadService } from "../../core/services/entidad.service";
import { SaldoService } from "../../core/services/saldo.service";
import { LoadingSpinnerComponent } from "../../shared/components/loading-spinner/loading-spinner.component";
import {
  Operacion,
  EntidadFinanciera,
  Saldo,
  TipoOperacion,
  EstadoOperacion,
} from "../../core/models/models";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { AlertService } from "../../shared/services/alert.service";

interface ChartData {
  name: string;
  value: number;
}

@Component({
  selector: "app-reporte",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    NgxChartsModule,
    LoadingSpinnerComponent,
  ],
  templateUrl: "./reporte.component.html",
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ["./reporte.component.scss"],
})
export class ReporteComponent implements OnInit {
  private operacionService = inject(OperacionService);
  private entidadService = inject(EntidadService);
  private saldoService = inject(SaldoService);
  private _alertService = inject(AlertService);

  sortBy = signal("");
  direction = signal<"ASC" | "DESC">("ASC");
  filtroTipo = signal<TipoOperacion | "">("");
  filtroEstado = signal<EstadoOperacion | "">("");
  fechaInicio = signal("");
  fechaFin = signal("");
  entidadFiltro = signal("");

  loading = signal(false);
  entidades = signal<EntidadFinanciera[]>([]);
  totalComision = signal<number>(0);
  chartOperacionesPorTipo = signal<ChartData[]>([]);
  chartMontosPorEntidad = signal<ChartData[]>([]);
  chartOperacionesPorEstado = signal<ChartData[]>([]);

  dataSource = new MatTableDataSource<Operacion>([]);

  displayedColumns: string[] = [
    "id",
    "tipo",
    "entidad",
    "monto",
    "estado",
    "fecha",
  ];

  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  ngOnInit(): void {
    this.loadEntidades();
    this.loadDatos();
  }

  loadEntidades(): void {
    this.entidadService.listarActivas().subscribe({
      next: (response) => {
        this.entidades.set(response.data);
      },
    });
  }

  loadDatos(): void {
    this.loading.set(true);

    this.operacionService
      .listar({
        page: this.pageIndex,
        size: this.pageSize,
        tipoOperacion: this.filtroTipo(),
        sortBy: this.sortBy(),
        direction: this.direction(),
        finicio: this.fechaInicio(),
        ffin: this.fechaFin(),
        estadoOperacion: this.filtroEstado(),
        entidad: this.entidadFiltro(),
      })
      .subscribe({
        next: (response) => {
          this.dataSource.data = response.data.content;
          this.totalElements = response.data.totalElements;

          this.totalComision.set(
            response.data.content.reduce(
              (acc, op) => acc + parseFloat(op.comision || "0"),
              0,
            ),
          );
          this.buildCharts(response.data.content);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
        },
      });
  }
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadDatos();
  }
  generarReporte(type: "excel" | "pdf"): void {
    this.operacionService
      .reporteOperaciones(
        {
          tipoOperacion: this.filtroTipo(),
          sortBy: this.sortBy(),
          direction: this.direction(),
          finicio: this.fechaInicio(),
          ffin: this.fechaFin(),
          estadoOperacion: this.filtroEstado(),
          entidad: this.entidadFiltro(),
        },
        type,
      )
      .subscribe(
        (response: any) => {
          if (type === "excel") {
            const blob = new Blob([response], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "reporte_operaciones.xlsx";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          }
          if (type === "pdf") {
            const doc = new jsPDF();
            autoTable(doc, { html: "#reporte-table" });
            doc.save("reporte_operaciones.pdf");
          }
        },
        (error: any) => {
          this._alertService.getAlert(
            "Error",
            "Ocurrió un error al generar el reporte.",
            "error",
          );
        },
      );
  }

  buildCharts(ops: Operacion[]): void {
    const porTipo: Record<string, number> = {};
    const porEstado: Record<string, number> = {};
    const montosPorEntidad: Record<string, number> = {};

    ops.forEach((op) => {
      const tipoLabel =
        op.tipo === "PAGO_SERVICIO"
          ? "Pago"
          : op.tipo.charAt(0) + op.tipo.slice(1).toLowerCase();
      porTipo[tipoLabel] = (porTipo[tipoLabel] || 0) + 1;
      porEstado[op.estado] = (porEstado[op.estado] || 0) + 1;
      const entidadNombre = op.entidad!;
      montosPorEntidad[entidadNombre] =
        (montosPorEntidad[entidadNombre] || 0) + op.monto;
    });

    this.chartOperacionesPorTipo.set(
      Object.entries(porTipo).map(([name, value]) => ({ name, value })),
    );
    this.chartOperacionesPorEstado.set(
      Object.entries(porEstado).map(([name, value]) => ({ name, value })),
    );
    this.chartMontosPorEntidad.set(
      Object.entries(montosPorEntidad).map(([name, value]) => ({
        name,
        value,
      })),
    );
  }

  limpiarFiltros(): void {
    this.filtroTipo.set("");
    this.filtroEstado.set("");
    this.entidadFiltro.set("");
    this.fechaInicio.set("");
    this.fechaFin.set("");
    this.pageIndex = 0;
    this.loadDatos();
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "PEN",
      minimumFractionDigits: 2,
    }).format(value);
  }

  formatDate(date: string | null | undefined): string {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  getTipoLabel(tipo: string): string {
    const labels: Record<string, string> = {
      RETIRO: "Retiro",
      DEPOSITO: "Depósito",
      PAGO_SERVICIO: "Pago",
    };
    return labels[tipo] || tipo;
  }

  getTotalMonto(): number {
    return this.dataSource.data.reduce((sum, op) => sum + op.monto, 0);
  }

  filtrarPorTipo(tipo: TipoOperacion): void {
    this.filtroTipo.set(tipo);
    this.loadDatos();
  }
  filtrarPorEstado(tipo: EstadoOperacion): void {
    this.filtroEstado.set(tipo);
    this.loadDatos();
  }
  filtrarPorFechainicio(inicioDate: Date) {
    this.fechaInicio.set(inicioDate.toISOString().split("T")[0] + "T00:00:00");
  }
  filtrarPorFechaFin(finDate: Date) {
    if (finDate) {
      console.log(finDate);
      this.fechaFin.set(finDate.toISOString().split("T")[0] + "T23:59:59");
      this.loadDatos();
    }
  }

  filtarPorEntidad(value: any) {
    this.entidadFiltro.set(value);
    this.loadDatos();
  }
}
