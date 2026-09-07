import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../../core/services/auth.service';
import { AlertService } from "../../../shared/services/alert.service";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private _alertService = inject(AlertService);

  currentUser = this.authService.currentUser;
  loading = signal(false);

  profileForm = this.fb.group({
    nombre: ["", [Validators.required]],
    apellido: ["", [Validators.required]],
    correo: [{ value: "", disabled: true }],
  });

  constructor() {
    const user = this.currentUser();
    if (user) {
      this.profileForm.patchValue({
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.correo,
      });
    }
  }

  saveProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const user = this.currentUser();
    if (!user) return;

    const updatedUser = {
      ...user,
      nombre: this.profileForm.value.nombre!,
      apellido: this.profileForm.value.apellido!,
    };

    setTimeout(() => {
      this.authService.updateProfile(updatedUser);
      this.loading.set(false);
      this._alertService.getAlert(
        "Perfil actualizado correctamente",
        "",
        "success",
      );
    }, 500);
  }

  getInitials(): string {
    const user = this.currentUser();
    if (!user) return "?";
    return `${user.nombre.charAt(0)}${user.apellido.charAt(0)}`.toUpperCase();
  }

  getFullName(): string {
    const user = this.currentUser();
    if (!user) return "";
    return `${user.nombre} ${user.apellido}`;
  }
}
