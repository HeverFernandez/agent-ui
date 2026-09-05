import { Component, inject, signal, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { OperacionService } from '../../../core/services/operacion.service';
import { NotificationService } from '../../../core/services/notification.service';
import { DialogService } from '../../../shared/services/dialog.service';
import {
  Operacion,
  TipoOperacion,
  EstadoOperacion,
  FiltroOperacion,
  PageResponse,
  ApiResponse,
} from "../../../core/models/models";
import { LoadingSpinnerComponent } from "../../../shared/components/loading-spinner/loading-spinner.component";

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
  styleUrls: ["./operacion-list.component.scss"],
})
export class OperacionListComponent implements OnInit {
  private operacionService = inject(OperacionService);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private dialogService = inject(DialogService);

  loading = signal(true);
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

  filtroTipo = signal<TipoOperacion | "">("");
  filtroEstado = signal<EstadoOperacion | "">("");
  filtroEntidad = signal<number | "">("");
  fechaInicio = signal("");
  fechaFin = signal("");

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadOperaciones();
  }

  loadOperaciones(): void {
    this.loading.set(true);
    this.operacionService.listar(this.pageIndex, this.pageSize).subscribe({
      next: (response: ApiResponse<PageResponse<Operacion>>) => {
        this.dataSource.data = response.data.content;
        this.totalElements = response.data.totalElements;
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  buscar(): void {
    const tieneFiltros =
      this.filtroTipo() ||
      this.filtroEstado() ||
      this.filtroEntidad() ||
      this.fechaInicio() ||
      this.fechaFin();
    if (!tieneFiltros) {
      this.loadOperaciones();
      return;
    }

    this.loading.set(true);
    const filtro: FiltroOperacion = {
      tipoOperacion: this.filtroTipo() || null,
      estadoOperacion: this.filtroEstado() || null,
      idEntidad: this.filtroEntidad() ? +this.filtroEntidad() : null,
      fechaInicio: this.fechaInicio() || null,
      fechaFin: this.fechaFin() || null,
    };
    this.operacionService
      .buscar(filtro, this.pageIndex, this.pageSize)
      .subscribe({
        next: (response) => {
          this.dataSource.data = response.content;
          this.totalElements = response.totalElements;
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
        },
      });
  }

  limpiarFiltros(): void {
    this.filtroTipo.set("");
    this.filtroEstado.set("");
    this.filtroEntidad.set("");
    this.fechaInicio.set("");
    this.fechaFin.set("");
    this.pageIndex = 0;
    this.loadOperaciones();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.buscar();
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
              this.notification.success("Operación eliminada correctamente");
              this.buscar();
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
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  getTipoLabel(tipo: TipoOperacion): string {
    const labels: Record<TipoOperacion, string> = {
      RETIRO: "Retiro",
      DEPOSITO: "Depósito",
      PAGO_SERVICIO: "Pago",
    };
    return labels[tipo] || tipo;
  }
}
