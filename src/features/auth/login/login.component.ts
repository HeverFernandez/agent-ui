import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private notification = inject(NotificationService);

  loading = signal(false);
  hidePassword = signal(true);

  loginForm = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    clave: ['', [Validators.required, Validators.minLength(6)]],
  });

  submit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    this.authService.login(this.loginForm.value as any).subscribe({
      next: () => {
        this.loading.set(false);
        this.notification.success('Bienvenido a Nuvanta');
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
        this.router.navigate([returnUrl]);
      },
      error: (err) => {
        this.loading.set(false);
        this.notification.error(err.message || 'Credenciales inválidas');
      },
    });
  }

  togglePassword(): void {
    this.hidePassword.update((v) => !v);
  }

  fillDemo(role: 'admin' | 'agente'): void {
    if (role === 'admin') {
      this.loginForm.patchValue({
        correo: 'admin@nuvanta.com',
        clave: 'admin123',
      });
    } else {
      this.loginForm.patchValue({
        correo: 'agente@nuvanta.com',
        clave: 'agente123',
      });
    }
  }
}
