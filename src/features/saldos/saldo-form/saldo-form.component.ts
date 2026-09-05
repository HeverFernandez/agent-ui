import { Component, inject, signal, OnInit } from '@angular/core';
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
import { EntidadService } from '../../../core/services/entidad.service';
import { NotificationService } from '../../../core/services/notification.service';
import { AuthService } from '../../../core/services/auth.service';
import { Saldo, EntidadFinanciera, EstadoSaldo } from '../../../core/models/models';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { EntidadSelectorDialogComponent } from '../../../shared/components/entidad-selector-dialog/entidad-selector-dialog.component';

@Component({
  selector: 'app-saldo-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule,
    LoadingSpinnerComponent,
  ],
  templateUrl: './saldo-form.component.html',
  styleUrls: ['./saldo-form.component.scss'],
})
export class SaldoFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private saldoService = inject(SaldoService);
  private entidadService = inject(EntidadService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);

  loading = signal(false);
  saving = signal(false);
  isEdit = signal(false);
  saldoId: number | null = null;
  entidades = signal<EntidadFinanciera[]>([]);
  entidadSeleccionada = signal<EntidadFinanciera | null>(null);

  form = this.fb.group({
    idEntidad: [null as number | null, [Validators.required]],
    montoInicial: [0, [Validators.required, Validators.min(0.01)]],
    montoDisponible: [0, [Validators.required, Validators.min(0)]],
    fechaAsignacion: [new Date().toISOString().split('T')[0], [Validators.required]],
    fechaVencimiento: [''],
    usuarioAsignador: [''],
    observaciones: [''],
    estadoSaldo: ['ACTIVO' as EstadoSaldo, [Validators.required]],
  });

  ngOnInit(): void {
    this.loadEntidades();
    const user = this.authService.currentUser();
    if (user) {
      this.form.patchValue({ usuarioAsignador: `${user.nombre} ${user.apellido}` });
    }
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit.set(true);
      this.saldoId = +id;
      this.loadSaldo(this.saldoId);
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
        this.form.patchValue({
          idEntidad: saldo.idEntidad,
          montoInicial: saldo.montoInicial,
          montoDisponible: saldo.montoDisponible,
          fechaAsignacion: saldo.fechaAsignacion?.split('T')[0] || '',
          fechaVencimiento: saldo.fechaVencimiento?.split('T')[0] || '',
          usuarioAsignador: saldo.usuarioAsignador,
          observaciones: saldo.observaciones,
          estadoSaldo: saldo.estadoSaldo,
        });
        this.actualizarEntidadSeleccionada();
        this.loading.set(false);
      },
      error: () => { this.loading.set(false); },
    });
  }

  onMontoInicialChange(): void {
    const montoInicial = this.form.get('montoInicial')?.value;
    if (!this.isEdit()) {
      this.form.get('montoDisponible')?.setValue(montoInicial ?? 0);
    }
  }

  seleccionarEntidad(): void {
    const dialogRef = this.dialog.open(EntidadSelectorDialogComponent, {
      width: '520px',
      maxWidth: 'calc(100vw - 32px)',
      data: { entidades: this.entidades() },
    });

    dialogRef.afterClosed().subscribe((entidad: EntidadFinanciera | undefined) => {
      if (entidad) {
        this.form.patchValue({ idEntidad: entidad.idEntidad });
        this.entidadSeleccionada.set(entidad);
        this.form.get('idEntidad')?.markAsTouched();
      }
    });
  }

  private actualizarEntidadSeleccionada(): void {
    const idEntidad = this.form.get('idEntidad')?.value;
    this.entidadSeleccionada.set(
      this.entidades().find((entidad) => entidad.idEntidad === idEntidad) ?? null,
    );
  }

  save(): void {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      this.notification.warning('Complete los campos obligatorios antes de asignar el saldo');
      return;
    }
    this.saving.set(true);
    const saldo: Saldo = {
      idSaldo: this.saldoId,
      idEntidad: this.form.value.idEntidad!,
      montoInicial: this.form.value.montoInicial!,
      montoDisponible: this.form.value.montoDisponible!,
      fechaAsignacion: this.form.value.fechaAsignacion!,
      fechaVencimiento: this.form.value.fechaVencimiento || null,
      usuarioAsignador: this.form.value.usuarioAsignador!,
      observaciones: this.form.value.observaciones || '',
      estadoSaldo: this.form.value.estadoSaldo as EstadoSaldo,
    };

    if (this.isEdit() && this.saldoId) {
      this.saldoService.actualizar(this.saldoId, saldo).subscribe({
        next: () => { this.saving.set(false); this.notification.success('Saldo actualizado correctamente'); this.router.navigate(['/saldos']); },
        error: () => { this.saving.set(false); },
      });
    } else {
      console.log('Creating new saldo:', saldo);
      this.saldoService.crear(saldo).subscribe({
        next: () => { this.saving.set(false); this.notification.success('Saldo asignado correctamente'); this.router.navigate(['/saldos']); },
        error: () => { this.saving.set(false); },
      });
    }
  }

  cancel(): void { this.router.navigate(['/saldos']); }
}
