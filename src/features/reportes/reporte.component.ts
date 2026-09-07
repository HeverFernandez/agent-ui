import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { OperacionService } from '../../core/services/operacion.service';
import { EntidadService } from '../../core/services/entidad.service';
import { SaldoService } from "../../core/services/saldo.service";
import { LoadingSpinnerComponent } from "../../shared/components/loading-spinner/loading-spinner.component";
import { Operacion, EntidadFinanciera, Saldo } from "../../core/models/models";
import { forkJoin, catchError, of } from "rxjs";
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
  styleUrls: ["./reporte.component.scss"],
})
export class ReporteComponent implements OnInit {
  private operacionService = inject(OperacionService);
  private entidadService = inject(EntidadService);
  private saldoService = inject(SaldoService);
  private _alertService = inject(AlertService);

  loading = signal(false);
  entidades = signal<EntidadFinanciera[]>([]);
  operaciones = signal<Operacion[]>([]);
  saldos = signal<Saldo[]>([]);

  fechaInicio = signal("");
  fechaFin = signal("");
  entidadFiltro = signal<number | "">("");

  chartOperacionesPorTipo = signal<ChartData[]>([]);
  chartMontosPorEntidad = signal<ChartData[]>([]);
  chartOperacionesPorEstado = signal<ChartData[]>([]);

  displayedColumns: string[] = [
    "idOperacion",
    "tipoOperacion",
    "entidad",
    "montoOperacion",
    "estadoOperacion",
    "fechaOperacion",
  ];

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
    forkJoin({
      operaciones: this.operacionService
        .listar(0, 1000)
        .pipe(catchError(() => of(null))),
      saldos: this.saldoService
        .listar(0, 1000)
        .pipe(catchError(() => of(null))),
    }).subscribe({
      next: ({ operaciones, saldos }) => {
        let ops: Operacion[] = [];
        let sld: Saldo[] = [];

        if (operaciones) {
          ops = operaciones.data.content;
          if (this.fechaInicio() && this.fechaFin()) {
            ops = ops.filter((o) => {
              const fecha = o.fechaOperacion?.split("T")[0] || "";
              return fecha >= this.fechaInicio() && fecha <= this.fechaFin();
            });
          }
          if (this.entidadFiltro()) {
            ops = ops.filter((o) => o.idEntidad === +this.entidadFiltro());
          }
        }

        if (saldos) {
          sld = saldos.data.content;
          if (this.entidadFiltro()) {
            sld = sld.filter((s) => s.idEntidad === +this.entidadFiltro());
          }
        }

        this.operaciones.set(ops);
        this.saldos.set(sld);
        this.buildCharts(ops);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  buildCharts(ops: Operacion[]): void {
    const porTipo: Record<string, number> = {};
    const porEstado: Record<string, number> = {};
    const montosPorEntidad: Record<string, number> = {};

    ops.forEach((op) => {
      const tipoLabel =
        op.tipoOperacion === "PAGO_SERVICIO"
          ? "Pago"
          : op.tipoOperacion.charAt(0) +
            op.tipoOperacion.slice(1).toLowerCase();
      porTipo[tipoLabel] = (porTipo[tipoLabel] || 0) + 1;
      porEstado[op.estadoOperacion] = (porEstado[op.estadoOperacion] || 0) + 1;
      const entidadNombre =
        op.entidadFinanciera?.denominacion || `Entidad #${op.idEntidad}`;
      montosPorEntidad[entidadNombre] =
        (montosPorEntidad[entidadNombre] || 0) + op.montoOperacion;
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

  filtrar(): void {
    this.loadDatos();
  }

  limpiarFiltros(): void {
    this.fechaInicio.set("");
    this.fechaFin.set("");
    this.entidadFiltro.set("");
    this.loadDatos();
  }

  exportarPDF(): void {
    if (this.operaciones().length === 0) {
      this._alertService.getAlert("No hay datos para exportar", "", "warning");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Reporte de Operaciones - Nuvanta", 14, 20);
    doc.setFontSize(10);
    doc.text(
      `Fecha de generación: ${new Date().toLocaleString("es-ES")}`,
      14,
      28,
    );
    if (this.fechaInicio() && this.fechaFin()) {
      doc.text(`Rango: ${this.fechaInicio()} - ${this.fechaFin()}`, 14, 34);
    }

    const head = [
      ["ID", "Tipo", "Entidad", "Monto", "Referencia", "Estado", "Fecha"],
    ];
    const body = this.operaciones().map((op) => [
      op.id?.toString() || "",
      op.tipoOperacion,
      op.entidadFinanciera?.denominacion || `Entidad #${op.idEntidad}`,
      `S/ ${op.montoOperacion.toFixed(2)}`,
      op.numeroReferencia,
      op.estadoOperacion,
      this.formatDate(op.fechaOperacion),
    ]);

    autoTable(doc, {
      head,
      body,
      startY: 40,
      theme: "striped",
      styles: { fontSize: 8 },
    });
    doc.save("reporte-operaciones.pdf");
    this._alertService.getAlert("PDF exportado correctamente", "", "success");
  }

  exportarExcel(): void {
    if (this.operaciones().length === 0) {
      this._alertService.getAlert("No hay datos para exportar", "", "warning");
      return;
    }

    const data = this.operaciones().map((op) => ({
      ID: op.id,
      Tipo: op.tipoOperacion,
      Entidad: op.entidadDenominacion || `Entidad #${op.idEntidad}`,
      Monto: op.montoOperacion,
      Referencia: op.numeroReferencia,
      Descripción: op.descripcionOperacion,
      Estado: op.estadoOperacion,
      "Servicio Pagado": op.servicioPagado,
      Usuario: op.usuarioRegistro,
      Fecha: this.formatDate(op.fechaOperacion),
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Operaciones");
    XLSX.writeFile(wb, "reporte-operaciones.xlsx");
    this._alertService.getAlert("Excel exportado correctamente", "", "success");
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
    return this.operaciones().reduce((sum, op) => sum + op.montoOperacion, 0);
  }
}
