import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SaldoService } from '../../../core/services/saldo.service';
import { EntidadService } from "../../../core/services/entidad.service";
import { AuthService } from "../../../core/services/auth.service";
import {
  Saldo,
  EntidadFinanciera,
  EstadoSaldo,
} from "../../../core/models/models";
import { LoadingSpinnerComponent } from "../../../shared/components/loading-spinner/loading-spinner.component";
import { EntidadSelectorDialogComponent } from "../../../shared/components/entidad-selector-dialog/entidad-selector-dialog.component";
import { AlertService } from "../../../shared/services/alert.service";

@Component({
  selector: "app-saldo-form",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    LoadingSpinnerComponent,
  ],
  templateUrl: "./saldo-form.component.html",
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ["./saldo-form.component.scss"],
})
export class SaldoFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private saldoService = inject(SaldoService);
  private entidadService = inject(EntidadService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private _alertService = inject(AlertService);
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);

  loading = signal(false);
  saving = signal(false);
  isEdit = signal(false);
  saldoId: number | null = null;
  entidades = signal<EntidadFinanciera[]>([]);
  entidadSeleccionada = signal<EntidadFinanciera | null>(null);
  isFinancialEntityId = signal<number>(0);

  // TODO: el back tiene que agregar el usuario por el token, entonces debemos eliminar el campo de usuarioAsignador del form y del modelo Saldo, y no enviarlo al back
  form = this.fb.group({
    entidadFinancieraId: [null as number | null, [Validators.required]],
    montoInicial: [0, [Validators.required, Validators.min(0.01)]],
    usuarioAsignador: ["aitamh"],
  });

  ngOnInit(): void {
    this.loadEntidades();
    const user = this.authService.currentUser();
    if (user) {
      this.form.patchValue({
        usuarioAsignador: `${user.nombre} ${user.apellido}`,
      });
    }
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.isEdit.set(true);
      this.saldoId = +id;
      this.loadSaldo(this.saldoId);
      this.actualizarEntidadSeleccionada();
    }
  }

  loadEntidades(): void {
    this.entidadService.listarActivas().subscribe({
      next: (response) => {
        this.entidades.set(response.data);
        this.actualizarEntidadSeleccionada();
      },
    });
  }

  loadSaldo(id: number): void {
    this.loading.set(true);
    this.saldoService.obtenerPorId(id).subscribe({
      next: (response) => {
        const saldo = response.data;
        this.isFinancialEntityId.set(saldo.entidadFinancieraId);
        this.form.patchValue({
          entidadFinancieraId: saldo.idEntidad,
          montoInicial: saldo.montoInicial,
          usuarioAsignador: saldo.usuarioAsignador,
        });
        this.actualizarEntidadSeleccionada();
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  seleccionarEntidad(): void {
    const dialogRef = this.dialog.open(EntidadSelectorDialogComponent, {
      width: "520px",
      maxWidth: "calc(100vw - 32px)",
      data: { entidades: this.entidades() },
    });

    dialogRef.afterClosed().subscribe((entidad: any | undefined) => {
      console.log("Entidad seleccionada:", entidad);
      if (entidad) {
        this.form.patchValue({ entidadFinancieraId: entidad.id });
        this.entidadSeleccionada.set(entidad);
        this.form.get("entidadFinancieraId")?.markAsTouched();
      }
    });
  }

  private actualizarEntidadSeleccionada(): void {
    this.entidadSeleccionada.set(
      this.entidades().find(
        (entidad) => entidad.id === this.isFinancialEntityId(),
      ) ?? null,
    );
    if (this.entidadSeleccionada()) {
      console.log(this.entidadSeleccionada());

      this.form.patchValue({
        entidadFinancieraId: this.entidadSeleccionada()!.id,
      });
      this.form.get("entidadFinancieraId")?.markAsTouched();
    }
  }

  save(): void {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      this._alertService.getAlert(
        "Complete los campos obligatorios antes de asignar el saldo",
        "",
        "warning",
      );
      return;
    }
    this.saving.set(true);
    const saldo: any = {
      idSaldo: this.saldoId,
      entidadFinancieraId: this.form.value.entidadFinancieraId!,
      montoInicial: this.form.value.montoInicial!,
      usuarioAsignador: this.form.value.usuarioAsignador!,
    };

    if (this.isEdit() && this.saldoId) {
      this.saldoService.actualizar(this.saldoId, saldo).subscribe({
        next: () => {
          this.saving.set(false);
          this._alertService.getAlert(
            "Saldo actualizado correctamente",
            "",
            "success",
          );
          this.router.navigate(["/saldos"]);
        },
        error: () => {
          this.saving.set(false);
        },
      });
    } else {
      console.log("Creating new saldo:", saldo);
      this.saldoService.crear(saldo).subscribe({
        next: () => {
          this.saving.set(false);
          this._alertService.getAlert(
            "Saldo asignado correctamente",
            "",
            "success",
          );
          this.router.navigate(["/saldos"]);
        },
        error: () => {
          this.saving.set(false);
        },
      });
    }
  }

  cancel(): void {
    this.router.navigate(["/saldos"]);
  }
}
