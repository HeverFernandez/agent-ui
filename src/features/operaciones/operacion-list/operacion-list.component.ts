import {
  Component,
  inject,
  signal,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import {
  MatPaginatorModule,
  MatPaginator,
  PageEvent,
} from "@angular/material/paginator";
import { MatSortModule, MatSort } from "@angular/material/sort";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { OperacionService } from "../../../core/services/operacion.service";
import { DialogService } from "../../../shared/services/dialog.service";
import {
  Operacion,
  TipoOperacion,
  EstadoOperacion,
  PageResponse,
  ApiResponse,
  EntidadFinanciera,
} from "../../../core/models/models";
import { LoadingSpinnerComponent } from "../../../shared/components/loading-spinner/loading-spinner.component";
import { AlertService } from "../../../shared/services/alert.service";
import { EntidadService } from "src/core/services";

@Component({
  selector: "app-operacion-list",
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    LoadingSpinnerComponent,
  ],
  templateUrl: "./operacion-list.component.html",
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ["./operacion-list.component.scss"],
})
export class OperacionListComponent implements OnInit {
  private operacionService = inject(OperacionService);
  private router = inject(Router);
  private _alertService = inject(AlertService);
  private dialogService = inject(DialogService);
  private entidadService = inject(EntidadService);

  dataSource = new MatTableDataSource<Operacion>([]);
  displayedColumns: string[] = [
    "idOperacion",
    "tipoOperacion",
    "entidad",
    "montoOperacion",
    "numeroReferencia",
    "estadoOperacion",
    "fechaOperacion",
    "acciones",
  ];

  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  sortBy = signal("");
  direction = signal<"ASC" | "DESC">("ASC");
  filtroTipo = signal<TipoOperacion | "">("");
  filtroEstado = signal<EstadoOperacion | "">("");
  fechaInicio = signal("");
  fechaFin = signal("");

  entidadFiltro = signal("");
  entidades = signal<EntidadFinanciera[]>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadOperaciones();
    this.loadEntidades();
  }

  loadOperaciones(): void {
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
        next: (response: ApiResponse<PageResponse<Operacion>>) => {
          this.dataSource.data = response.data.content;
          this.totalElements = response.data.totalElements;
        },
        error: () => {
          this._alertService.getAlert(
            "Alerta",
            "Error en cargar operaciones",
            "warning",
          );
        },
      });
  }
  loadEntidades(): void {
    this.entidadService.listarActivas().subscribe({
      next: (response) => {
        this.entidades.set(response.data);
      },
    });
  }

  limpiarFiltros(): void {
    this.filtroTipo.set("");
    this.filtroEstado.set("");
    this.entidadFiltro.set("");
    this.fechaInicio.set("");
    this.fechaFin.set("");
    this.pageIndex = 0;
    this.loadOperaciones();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadOperaciones();
  }

  crear(): void {
    this.router.navigate(["/operaciones/nuevo"]);
  }
  editar(op: Operacion): void {
    this.router.navigate(["/operaciones/editar", op.id]);
  }

  eliminar(op: Operacion): void {
    this.dialogService
      .confirmar(
        "Eliminar Operación",
        `¿Está seguro de eliminar la operación #${op.id}?`,
        "Eliminar",
        "Cancelar",
      )
      .subscribe((confirmado) => {
        if (confirmado && op.id) {
          this.operacionService.eliminar(op.id).subscribe({
            next: () => {
              this._alertService.getAlert(
                "Operación eliminada correctamente",
                "",
                "success",
              );
              this.loadOperaciones();
            },
          });
        }
      });
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
    });
  }

  senDateFormat(date: any) {
    if (!date) return "";
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }
  getTipoLabel(tipo: TipoOperacion): string {
    const labels: Record<TipoOperacion, string> = {
      RETIRO: "Retiro",
      DEPOSITO: "Depósito",
      PAGO_SERVICIO: "Pago",
    };
    return labels[tipo] || tipo;
  }

  filtrarPorTipo(tipo: TipoOperacion): void {
    this.filtroTipo.set(tipo);
    this.loadOperaciones();
  }
  filtrarPorEstado(tipo: EstadoOperacion): void {
    this.filtroEstado.set(tipo);
    this.loadOperaciones();
  }
  filtrarPorFechainicio(inicioDate: string) {
    this.fechaInicio.set(this.senDateFormat(inicioDate) + "T00:00:00");
    console.log(this.fechaInicio);
    this.loadOperaciones();
  }
  filtrarPorFechaFin(finDate: string) {
    let date =
      finDate ||
      `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`;
    this.fechaFin.set(this.senDateFormat(date) + "T23:59:59");
    console.log(this.fechaFin);
    this.loadOperaciones();
  }

  filtarPorEntidad(value: any) {
    this.entidadFiltro.set(value);
    this.loadOperaciones();
  }
}
