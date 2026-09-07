import {
  Component,
  inject,
  signal,
  OnInit,
  ChangeDetectionStrategy,
} from "@angular/core";
import { CommonModule, JsonPipe } from "@angular/common";
import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { OperacionService } from "../../../core/services/operacion.service";
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
  changeDetection: ChangeDetectionStrategy.Eager,
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
    idEntidadFinanciera: [null as number | null, [Validators.required]],
    tipoOperacion: ["RETIRO", [Validators.required]],
    montoOperacion: [0, [Validators.required, Validators.min(0.01)]],
    descripcionOperacion: ["", [Validators.required]],
    numeroReferencia: ["", [Validators.required]],
    usuarioId: ["", [Validators.required]],
    servicioPagado: [""],
  });

  ngOnInit(): void {
    this.loadEntidades();
    const user = this.authService.currentUser();
    if (user) {
      console.log(user);

      this.form.patchValue({
        usuarioId: user.idUsuario?.toString(),
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
          idEntidadFinanciera: op.id,
          tipoOperacion: op.tipoOperacion,
          montoOperacion: op.montoOperacion,
          descripcionOperacion: op.descripcionOperacion,
          numeroReferencia: op.numeroReferencia,
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
    let operacion: any = {
      id: this.operacionId,
      idEntidadFinanciera: this.form.value.idEntidadFinanciera!,
      tipoOperacion: this.form.value.tipoOperacion as TipoOperacion,
      montoOperacion: this.form.value.montoOperacion!,
      descripcionOperacion: this.form.value.descripcionOperacion!,
      numeroReferencia: this.form.value.numeroReferencia!,
      usuarioId: this.form.value.usuarioId!,
      servicioPagado: this.form.value.servicioPagado || "",
    };
    if (operacion.tipoOperacion !== "PAGO_SERVICIO") {
      delete operacion.servicioPagado;
    }
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
        error: (error) => {
          this.saving.set(false);
        },
      });
    } else {
      delete operacion.id;

      console.log(operacion);
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
