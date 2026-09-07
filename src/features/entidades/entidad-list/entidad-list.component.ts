import { Component, inject, signal, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
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
import { EntidadService } from "../../../core/services/entidad.service";
import { DialogService } from "../../../shared/services/dialog.service";
import {
  EntidadFinanciera,
  TipoEntidad,
  PageResponse,
  ApiResponse,
} from "../../../core/models/models";
import { LoadingSpinnerComponent } from "../../../shared/components/loading-spinner/loading-spinner.component";
import { AlertService } from "../../../shared/services/alert.service";

@Component({
  selector: "app-entidad-list",
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
    LoadingSpinnerComponent,
  ],
  templateUrl: "./entidad-list.component.html",
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ["./entidad-list.component.scss"],
})
export class EntidadListComponent implements OnInit {
  private entidadService = inject(EntidadService);
  private router = inject(Router);
  private _alertService = inject(AlertService);
  private dialogService = inject(DialogService);

  loading = signal(true);
  dataSource = new MatTableDataSource<EntidadFinanciera>([]);
  displayedColumns: string[] = [
    "idEntidad",
    "denominacion",
    "tipoEntidad",
    "codigoEntidad",
    "descripcion",
    "estado",
    "createdAt",
    "acciones",
  ];

  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  filtroTipo = signal<TipoEntidad | "">("");
  searchText = signal("");

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadEntidades();
  }

  loadEntidades(): void {
    this.loading.set(true);
    this.entidadService.listar(this.pageIndex, this.pageSize).subscribe({
      next: (response: ApiResponse<PageResponse<EntidadFinanciera>>) => {
        this.dataSource.data = response.data.content;
        this.totalElements = response.data.totalElements;
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchText.set(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadEntidades();
  }

  crear(): void {
    this.router.navigate(["/entidades/nuevo"]);
  }

  editar(entidad: EntidadFinanciera): void {
    this.router.navigate(["/entidades/editar", entidad.idEntidad]);
  }

  eliminar(entidad: EntidadFinanciera): void {
    this.dialogService
      .confirmar(
        "Eliminar Entidad",
        `¿Está seguro de eliminar la entidad "${entidad.denominacion}"? Esta acción no se puede deshacer.`,
        "Eliminar",
        "Cancelar",
      )
      .subscribe((confirmado) => {
        if (confirmado && entidad.idEntidad) {
          this.entidadService.eliminar(entidad.idEntidad).subscribe({
            next: () => {
              this._alertService.getAlert(
                "Entidad eliminada correctamente",
                "",
                "success",
              );
              this.loadEntidades();
            },
          });
        }
      });
  }

  filtrarPorTipo(tipo: TipoEntidad | ""): void {
    this.filtroTipo.set(tipo);
    if (tipo === "") {
      this.loadEntidades();
    } else {
      this.loading.set(true);
      this.entidadService
        .listarPorTipo(tipo as TipoEntidad, this.pageIndex, this.pageSize)
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
  }

  formatDate(date: string | null | undefined): string {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }
}
