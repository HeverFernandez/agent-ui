import {
  Component,
  inject,
  signal,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  effect,
  linkedSignal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import {
  MatPaginatorModule,
  MatPaginator,
  PageEvent,
} from "@angular/material/paginator";
import { MatSortModule, MatSort, Sort } from "@angular/material/sort";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
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

  dataSource = new MatTableDataSource<EntidadFinanciera>([]);
  displayedColumns: string[] = [
    "codigoEntidad",
    "denominacion",
    "tipoEntidad",
    "descripcion",
    "estado",
    "createdAt",
    "acciones",
  ];

  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  pageType = "";
  pageSizeOptions: number[] = [5, 10, 25, 50];

  filtroTipo = signal<TipoEntidad | "">("");
  sortBy = signal("");
  direction = signal<"ASC" | "DESC">("ASC");
  searchText = signal("");
  initialValue = signal<string>("");
  valueSearch = signal<string>("");
  inputValue = linkedSignal<string>(() => this.initialValue() ?? "");

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadEntidades();
  }

  loadEntidades(): void {
    // this.loading.set(true);
    this.entidadService
      .listar({
        page: this.pageIndex,
        size: this.pageSize,
        tipo: this.filtroTipo(),
        searchTerm: this.valueSearch(),
        sortBy: this.sortBy(),
        direction: this.direction(),
      })
      .subscribe({
        next: (response: ApiResponse<PageResponse<EntidadFinanciera>>) => {
          this.dataSource.data = response.data.content;
          this.totalElements = response.data.totalElements;
        },
        error: () => {
          this._alertService.getAlert(
            "Alerta",
            "Error en cargar entidades",
            "warning",
          );
        },
      });
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
    this.router.navigate(["/entidades/editar", entidad.id]);
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
        if (confirmado && entidad.id) {
          this.entidadService.eliminar(entidad.id).subscribe({
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
    this.loadEntidades();
  }

  formatDate(date: string | null | undefined): string {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();
    const timeout = setTimeout(() => {
      this.valueSearch.set(value);
      this.loadEntidades();
    }, 500);
    onCleanup(() => {
      clearTimeout(timeout);
    });
  });

  sortData(sort: Sort) {
    console.log(sort);
    this.sortBy.set(sort.active);
    this.direction.set(sort.direction as any);
    if (sort.direction === "") {
      this.sortBy.set("");
    }
    this.loadEntidades();
    if (!sort.active || sort.direction === "") {
      return;
    }
  }
}
