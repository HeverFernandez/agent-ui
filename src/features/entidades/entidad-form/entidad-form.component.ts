import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
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
import { EntidadService } from "../../../core/services/entidad.service";
import {
  EntidadFinanciera,
  TipoEntidad,
  EstadoEntidad,
} from "../../../core/models/models";
import { LoadingSpinnerComponent } from "../../../shared/components/loading-spinner/loading-spinner.component";
import { AlertService } from "../../../shared/services/alert.service";

@Component({
  selector: "app-entidad-form",
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
  templateUrl: "./entidad-form.component.html",
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ["./entidad-form.component.scss"],
})
export class EntidadFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private entidadService = inject(EntidadService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private _alertService = inject(AlertService);

  loading = signal(false);
  saving = signal(false);
  isEdit = signal(false);
  entityId: number | null = null;

  form = this.fb.group({
    denominacion: ["", [Validators.required, Validators.minLength(3)]],
    tipoEntidad: ["BANCO" as TipoEntidad, [Validators.required]],
    descripcion: [""],
    //codigoEntidad: ['', [Validators.required, Validators.minLength(2)]],
    //estadoEntidad: ['ACTIVO' as EstadoEntidad, [Validators.required]],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.isEdit.set(true);
      this.entityId = +id;
      this.loadEntidad(this.entityId);
    }
  }

  loadEntidad(id: number): void {
    this.loading.set(true);
    this.entidadService.obtenerPorId(id).subscribe({
      next: (response) => {
        const entidad = response.data;
        this.form.patchValue({
          denominacion: entidad.denominacion,
          tipoEntidad: entidad.tipoEntidad,
          descripcion: entidad.descripcion,
          // codigoEntidad: entidad.codigoEntidad,
          //estadoEntidad: entidad.estadoEntidad,
        });
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    const entidad: EntidadFinanciera = {
      idEntidad: this.entityId,
      ...this.form.value,
    } as EntidadFinanciera;

    if (this.isEdit() && this.entityId) {
      this.entidadService.actualizar(this.entityId, entidad).subscribe({
        next: () => {
          this.saving.set(false);
          this._alertService.getAlert(
            "Entidad actualizada correctamente",
            "",
            "success",
          );
          this.router.navigate(["/entidades"]);
        },
        error: () => {
          this.saving.set(false);
        },
      });
    } else {
      this.entidadService.crear(entidad).subscribe({
        next: () => {
          this.saving.set(false);
          this._alertService.getAlert(
            "Entidad creada correctamente",
            "",
            "success",
          );
          this.router.navigate(["/entidades"]);
        },
        error: () => {
          this.saving.set(false);
        },
      });
    }
  }

  cancel(): void {
    this.router.navigate(["/entidades"]);
  }
}
