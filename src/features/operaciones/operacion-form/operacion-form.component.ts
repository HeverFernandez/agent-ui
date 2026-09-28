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
import { AuthService } from "../../../core/services/auth.service";
import {
  EntidadFinanciera,
  Saldo,
  TipoOperacion,
} from "../../../core/models/models";
import { LoadingSpinnerComponent } from "../../../shared/components/loading-spinner/loading-spinner.component";
import { AlertService } from "../../../shared/services/alert.service";
import { SaldoService } from "src/core/services/saldo.service";
import { EntidadService } from "src/core/services";

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
  private _saldoService = inject(SaldoService);
  private _entidadService = inject(EntidadService);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private _alertService = inject(AlertService);
  private authService = inject(AuthService);

  loading = signal(false);
  saving = signal(false);
  isEdit = signal(false);
  operacionId: number | null = null;
  entidades = signal<Saldo[] | null>(null);
  servicios = signal<EntidadFinanciera[] | null>(null);

  form = this.fb.group({
    tipo: ["RETIRO", [Validators.required]],
    idEntidadBanco: [null as number | null, [Validators.required]],
    monto: ["", [Validators.required, Validators.min(0.01)]],
    descripcion: [""],
    numeroReferencia: [""],
    usuarioId: ["", [Validators.required]],
    idEntidadServicio: [""],
    comision: [""],
  });

  ngOnInit(): void {
    this.loadEntidades();
    this.loadServices();
    const user = this.authService.currentUser();
    if (user) {
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
    this._saldoService.listar({ page: 0, size: 1000 }).subscribe({
      next: (response) => {
        this.entidades.set(response.data.content);
      },
    });
  }
  loadServices(): void {
    this._entidadService
      .listar({ page: 0, size: 1000, tipo: "SERVICIO" })
      .subscribe({
        next: (response) => {
          this.servicios.set(response.data.content);
        },
      });
  }

  loadOperacion(id: number): void {
    this.loading.set(true);
    this.operacionService.obtenerPorId(id).subscribe({
      next: (response) => {
        const op = response.data;
        this.form.patchValue({
          idEntidadBanco: op.id,
          tipo: op.tipo,
          monto: op.monto.toString(),
          descripcion: op.descripcion,
          numeroReferencia: op.numeroReferencia,
          comision: op.comision,
        });
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  onTipoChange(): void {
    const tipo = this.form.get("tipo")?.value;
    if (tipo !== "PAGO_SERVICIO") {
      this.form.patchValue({ idEntidadServicio: "" });
      this.form.controls["idEntidadServicio"].removeValidators(
        Validators.required,
      );
    } else {
      this.form.controls["idEntidadServicio"].addValidators(
        Validators.required,
      );
    }
    this.form.controls["idEntidadServicio"].updateValueAndValidity();
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    let operacion: any = {
      id: this.operacionId,
      idEntidadBanco: this.form.value.idEntidadBanco!,
      tipo: this.form.value.tipo as TipoOperacion,
      monto: +this.form.value.monto!,
      descripcion: this.form.value.descripcion!,
      numeroReferencia: this.form.value.numeroReferencia!,
      usuarioId: +this.form.value.usuarioId!,
      idEntidadServicio: this.form.value.idEntidadServicio || "",
      comision: +this.form.value.comision!,
    };
    if (operacion.tipo !== "PAGO_SERVICIO") {
      delete operacion.idEntidadServicio;
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
