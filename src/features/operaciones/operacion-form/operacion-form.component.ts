import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OperacionService } from '../../../core/services/operacion.service';
import { EntidadService } from "../../../core/services/entidad.service";
import { AuthService } from "../../../core/services/auth.service";
import {
  Operacion,
  EntidadFinanciera,
  TipoOperacion,
  EstadoOperacion,
} from "../../../core/models/models";
import { LoadingSpinnerComponent } from "../../../shared/components/loading-spinner/loading-spinner.component";
import { AlertService } from "../../../shared/services/alert.service";

@Component({
  selector: "app-operacion-form",
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
  templateUrl: "./operacion-form.component.html",
  styleUrls: ["./operacion-form.component.scss"],
})
export class OperacionFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private operacionService = inject(OperacionService);
  private entidadService = inject(EntidadService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private _alertService = inject(AlertService);
  private authService = inject(AuthService);

  loading = signal(false);
  saving = signal(false);
  isEdit = signal(false);
  operacionId: number | null = null;
  entidades = signal<EntidadFinanciera[]>([]);

  form = this.fb.group({
    idEntidad: [null as number | null, [Validators.required]],
    tipoOperacion: ["RETIRO", [Validators.required]],
    montoOperacion: [0, [Validators.required, Validators.min(0.01)]],
    descripcionOperacion: ["", [Validators.required]],
    fechaOperacion: [
      new Date().toISOString().split("T")[0],
      [Validators.required],
    ],
    numeroReferencia: ["", [Validators.required]],
    usuarioRegistro: ["", [Validators.required]],
    estadoOperacion: ["COMPLETADA" as EstadoOperacion, [Validators.required]],
    servicioPagado: [""],
  });

  ngOnInit(): void {
    this.loadEntidades();
    const user = this.authService.currentUser();
    if (user) {
      this.form.patchValue({
        usuarioRegistro: `${user.nombre} ${user.apellido}`,
      });
    }
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.isEdit.set(true);
      this.operacionId = +id;
      this.loadOperacion(this.operacionId);
    }
  }

  loadEntidades(): void {
    this.entidadService.listarActivas().subscribe({
      next: (response) => {
        this.entidades.set(response.data);
      },
    });
  }

  loadOperacion(id: number): void {
    this.loading.set(true);
    this.operacionService.obtenerPorId(id).subscribe({
      next: (response) => {
        const op = response.data;
        this.form.patchValue({
          idEntidad: op.idEntidad,
          tipoOperacion: op.tipoOperacion,
          montoOperacion: op.montoOperacion,
          descripcionOperacion: op.descripcionOperacion,
          fechaOperacion: op.fechaOperacion?.split("T")[0] || "",
          numeroReferencia: op.numeroReferencia,
          usuarioRegistro: op.usuarioRegistro,
          estadoOperacion: op.estadoOperacion,
          servicioPagado: op.servicioPagado,
        });
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  onTipoChange(): void {
    const tipo = this.form.get("tipoOperacion")?.value;
    if (tipo !== "PAGO_SERVICIO") {
      this.form.patchValue({ servicioPagado: "" });
    }
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    const operacion: Operacion = {
      id: this.operacionId,
      idEntidad: this.form.value.idEntidad!,
      tipoOperacion: this.form.value.tipoOperacion as TipoOperacion,
      montoOperacion: this.form.value.montoOperacion!,
      descripcionOperacion: this.form.value.descripcionOperacion!,
      fechaOperacion: this.form.value.fechaOperacion!,
      numeroReferencia: this.form.value.numeroReferencia!,
      usuarioRegistro: this.form.value.usuarioRegistro!,
      estadoOperacion: this.form.value.estadoOperacion as EstadoOperacion,
      servicioPagado: this.form.value.servicioPagado || "",
    };

    if (this.isEdit() && this.operacionId) {
      this.operacionService.actualizar(this.operacionId, operacion).subscribe({
        next: () => {
          this.saving.set(false);
          this._alertService.getAlert(
            "Operación actualizada correctamente",
            "",
            "success",
          );
          this.router.navigate(["/operaciones"]);
        },
        error: () => {
          this.saving.set(false);
        },
      });
    } else {
      this.operacionService.crear(operacion).subscribe({
        next: () => {
          this.saving.set(false);
          this._alertService.getAlert(
            "Operación registrada correctamente",
            "",
            "success",
          );
          this.router.navigate(["/operaciones"]);
        },
        error: () => {
          this.saving.set(false);
        },
      });
    }
  }

  cancel(): void {
    this.router.navigate(["/operaciones"]);
  }
}
