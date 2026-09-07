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
import { UsuarioService } from "../../../core/services/usuario.service";
import { DialogService } from "../../../shared/services/dialog.service";
import {
  Usuario,
  RolUsuario,
  EstadoUsuario,
  PageResponse,
} from "../../../core/models/models";
import { LoadingSpinnerComponent } from "../../../shared/components/loading-spinner/loading-spinner.component";
import { AlertService } from "../../../shared/services/alert.service";

@Component({
  selector: "app-usuario-list",
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
  templateUrl: "./usuario-list.component.html",
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ["./usuario-list.component.scss"],
})
export class UsuarioListComponent implements OnInit {
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);
  private _alertService = inject(AlertService);
  private dialogService = inject(DialogService);

  loading = signal(true);
  dataSource = new MatTableDataSource<Usuario>([]);
  displayedColumns: string[] = [
    "idUsuario",
    "nombre",
    "correo",
    "rol",
    "estado",
    "fechaRegistro",
    "acciones",
  ];

  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  filtroRol = signal<RolUsuario | "">("");
  filtroEstado = signal<EstadoUsuario | "">("");

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.loading.set(true);
    this.usuarioService.listar(this.pageIndex, this.pageSize).subscribe({
      next: (response: PageResponse<Usuario>) => {
        this.dataSource.data = response.content;
        this.totalElements = response.totalElements;
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUsuarios();
  }

  crear(): void {
    this.router.navigate(["/usuarios/nuevo"]);
  }
  editar(usuario: Usuario): void {
    this.router.navigate(["/usuarios/editar", usuario.idUsuario]);
  }

  eliminar(usuario: Usuario): void {
    this.dialogService
      .confirmar(
        "Eliminar Usuario",
        `¿Está seguro de eliminar al usuario "${usuario.nombre} ${usuario.apellido}"?`,
        "Eliminar",
        "Cancelar",
      )
      .subscribe((confirmado) => {
        if (confirmado && usuario.idUsuario) {
          this.usuarioService.eliminar(usuario.idUsuario).subscribe({
            next: () => {
              this._alertService.getAlert(
                "Usuario eliminado correctamente",
                "",
                "success",
              );
              this.loadUsuarios();
            },
          });
        }
      });
  }

  filtrarPorRol(rol: RolUsuario | ""): void {
    this.filtroRol.set(rol);
    if (rol === "") {
      this.loadUsuarios();
      return;
    }
    this.loading.set(true);
    this.usuarioService
      .listarPorRol(rol as RolUsuario, this.pageIndex, this.pageSize)
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

  filtrarPorEstado(estado: EstadoUsuario | ""): void {
    this.filtroEstado.set(estado);
    if (estado === "") {
      this.loadUsuarios();
      return;
    }
    this.loading.set(true);
    this.usuarioService
      .listarPorEstado(estado as EstadoUsuario, this.pageIndex, this.pageSize)
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

  formatDate(date: string | null | undefined): string {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }
}
