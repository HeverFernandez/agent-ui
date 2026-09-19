import {
  Component,
  inject,
  signal,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  linkedSignal,
  effect,
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
import { SaldoService } from "../../../core/services/saldo.service";
import { DialogService } from "../../../shared/services/dialog.service";
import {
  Saldo,
  EstadoSaldo,
  PageResponse,
  ApiResponse,
} from "../../../core/models/models";
import { LoadingSpinnerComponent } from "../../../shared/components/loading-spinner/loading-spinner.component";
import { AlertService } from "../../../shared/services/alert.service";

@Component({
  selector: "app-saldo-list",
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
  templateUrl: "./saldo-list.component.html",
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ["./saldo-list.component.scss"],
})
export class SaldoListComponent implements OnInit {
  private saldoService = inject(SaldoService);
  private router = inject(Router);
  private _alertService = inject(AlertService);
  private dialogService = inject(DialogService);

  dataSource = new MatTableDataSource<Saldo>([]);
  displayedColumns: string[] = [
    "idSaldo",
    "entidad",
    "montoInicial",
    "montoDisponible",
    "fechaAsignacion",
    "estadoSaldo",
    "acciones",
  ];

  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  filtroEstado = signal<EstadoSaldo | "">("");
  sortBy = signal("");
  direction = signal<"ASC" | "DESC">("ASC");
  initialValue = signal<string>("");
  valueSearch = signal<string>("");
  inputValue = linkedSignal<string>(() => this.initialValue() ?? "");
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadSaldos();
  }

  loadSaldos(): void {
    this.saldoService
      .listar({
        page: this.pageIndex,
        size: this.pageSize,
        sortBy: this.sortBy(),
        direction: this.direction(),
        estado: this.filtroEstado(),
        entidad: this.valueSearch(),
      })
      .subscribe({
        next: (response: ApiResponse<PageResponse<Saldo>>) => {
          this.dataSource.data = response.data.content;
          this.totalElements = response.data.totalElements;
        },
        error: () => {
          this._alertService.getAlert(
            "Alerta",
            "Error en cargar saldos",
            "warning",
          );
        },
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadSaldos();
  }

  crear(): void {
    this.router.navigate(["/saldos/nuevo"]);
  }
  editar(saldo: Saldo): void {
    this.router.navigate(["/saldos/editar", saldo.id]);
  }

  eliminar(saldo: Saldo): void {
    this.dialogService
      .confirmar(
        "Eliminar Saldo",
        `¿Está seguro de eliminar el saldo de ${saldo.entidadDenominacion}?`,
        "Eliminar",
        "Cancelar",
      )
      .subscribe((confirmado) => {
        if (confirmado && saldo.id) {
          this.saldoService.eliminar(saldo.id).subscribe({
            next: () => {
              this._alertService.getAlert(
                "Saldo eliminado correctamente",
                "El saldo ha sido eliminado exitosamente.",
                "success",
              );
              this.loadSaldos();
            },
          });
        }
      });
  }

  filtrarPorEstado(estado: EstadoSaldo | ""): void {
    this.filtroEstado.set(estado);
    this.loadSaldos();
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

  getSaldoClass(saldo: Saldo): string {
    if (saldo.montoDisponible <= 0) return "saldo-agotado";
    if (saldo.montoDisponible < saldo.montoInicial * 0.2) return "saldo-bajo";
    return "saldo-ok";
  }

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();
    const timeout = setTimeout(() => {
      this.valueSearch.set(value);
      this.loadSaldos();
    }, 500);
    onCleanup(() => {
      clearTimeout(timeout);
    });
  });

  sortData(sort: Sort) {
    console.log(sort);
    this.sortBy.set("entidadFinanciera");
    this.direction.set(sort.direction as any);
    if (sort.direction === "") {
      this.sortBy.set("");
    }
    this.loadSaldos();
    if (!sort.active || sort.direction === "") {
      return;
    }
  }
}
