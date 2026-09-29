import {
  Component,
  Inject,
  ChangeDetectionStrategy,
  inject,
  signal,
  effect,
  linkedSignal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { Saldo } from "../../../core/models/models";
import { SaldoService } from "src/core/services";

@Component({
  selector: "app-saldo-selector-dialog",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: "./saldo-selector-dialog.component.html",
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ["./saldo-selector-dialog.component.scss"],
})
export class SaldoSelectorDialogComponent {
  private _saldoService = inject(SaldoService);
  saldos = signal<Saldo[] | null>(null);

  initialValue = signal<string>("");
  valueSearch = signal<string>("");
  inputValue = linkedSignal<string>(() => this.initialValue() ?? "");

  constructor(
    private dialogRef: MatDialogRef<SaldoSelectorDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      saldoSelect: string;
    },
  ) {
    this.initialValue.set(this.data.saldoSelect);
  }

  entidadesFiltradas() {
    this._saldoService
      .listar({ page: 0, size: 10, entidad: this.valueSearch() })
      .subscribe({
        next: (response) => {
          this.saldos.set(response.data.content);
        },
        error: () => {
          this.saldos.set([]);
        },
      });
  }

  seleccionar(entidad: Saldo): void {
    this.dialogRef.close(entidad);
  }

  cerrar(): void {
    this.dialogRef.close();
  }

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();
    const timeout = setTimeout(() => {
      if (value.length === 0 || value.length > 2) {
        this.valueSearch.set(value);
        this.entidadesFiltradas();
      }
    }, 500);
    onCleanup(() => {
      clearTimeout(timeout);
    });
  });

  cleanData() {
    this.initialValue.set("");
    this.valueSearch.set("");
  }
}
