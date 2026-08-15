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
import { UsuarioService } from '../../../core/services/usuario.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Usuario, RolUsuario, EstadoUsuario } from '../../../core/models/models';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule,
    LoadingSpinnerComponent,
  ],
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss'],
})
export class UsuarioFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notification = inject(NotificationService);

  loading = signal(false);
  saving = signal(false);
  isEdit = signal(false);
  userId: number | null = null;

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    apellido: ['', [Validators.required, Validators.minLength(2)]],
    correo: ['', [Validators.required, Validators.email]],
    clave: ['', [Validators.minLength(6)]],
    rol: ['AGENTE' as RolUsuario, [Validators.required]],
    estado: ['ACTIVO' as EstadoUsuario, [Validators.required]],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit.set(true);
      this.userId = +id;
      this.loadUsuario(this.userId);
    }
  }

  loadUsuario(id: number): void {
    this.loading.set(true);
    this.usuarioService.obtenerPorId(id).subscribe({
      next: (response) => {
        const user = response.data;
        this.form.patchValue({
          nombre: user.nombre,
          apellido: user.apellido,
          correo: user.correo,
          rol: user.rol,
          estado: user.estado,
        });
        this.loading.set(false);
      },
      error: () => { this.loading.set(false); },
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    const usuario: Partial<Usuario> = {
      nombre: this.form.value.nombre!,
      apellido: this.form.value.apellido!,
      correo: this.form.value.correo!,
      rol: this.form.value.rol as RolUsuario,
      estado: this.form.value.estado as EstadoUsuario,
    };

    if (this.form.value.clave) {
      usuario.clave = this.form.value.clave;
    }

    if (this.isEdit() && this.userId) {
      this.usuarioService.actualizar(this.userId, usuario).subscribe({
        next: () => { this.saving.set(false); this.notification.success('Usuario actualizado correctamente'); this.router.navigate(['/usuarios']); },
        error: () => { this.saving.set(false); },
      });
    } else {
      this.usuarioService.crear(usuario).subscribe({
        next: () => { this.saving.set(false); this.notification.success('Usuario creado correctamente'); this.router.navigate(['/usuarios']); },
        error: () => { this.saving.set(false); },
      });
    }
  }

  cancel(): void { this.router.navigate(['/usuarios']); }
}
