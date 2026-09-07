import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../core/services/auth.service';
import { AlertService } from "../../../shared/services/alert.service";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: "./register.component.html",
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private _alertService = inject(AlertService);

  loading = signal(false);
  hidePassword = signal(true);

  registerForm = this.fb.group({
    nombre: ["", [Validators.required, Validators.minLength(2)]],
    apellido: ["", [Validators.required, Validators.minLength(2)]],
    correo: ["", [Validators.required, Validators.email]],
    clave: ["", [Validators.required, Validators.minLength(6)]],
    rol: ["AGENTE", [Validators.required]],
  });

  submit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const usuario: Partial<import("../../../core/models/models").Usuario> = {
      nombre: this.registerForm.value.nombre ?? "",
      apellido: this.registerForm.value.apellido ?? "",
      correo: this.registerForm.value.correo ?? "",
      clave: this.registerForm.value.clave ?? "",
      rol: (this.registerForm.value.rol ?? "AGENTE") as
        | "ADMINISTRADOR"
        | "AGENTE",
    };

    this.authService.register(usuario).subscribe({
      next: () => {
        this.loading.set(false);
        this._alertService.getAlert(
          "Usuario registrado exitosamente. Inicie sesión.",
          "",
          "success",
        );
        this.router.navigate(["/login"]);
      },
      error: (err) => {
        this.loading.set(false);
        this._alertService.getAlert(
          "Error",
          err.message || "Error al registrar usuario",
          "error",
          3000,
        );
      },
    });
  }

  togglePassword(): void {
    this.hidePassword.update((v) => !v);
  }
}
