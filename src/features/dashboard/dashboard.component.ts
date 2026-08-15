import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EntidadService } from '../../core/services/entidad.service';
import { SaldoService } from '../../core/services/saldo.service';
import { OperacionService } from '../../core/services/operacion.service';
import { AuthService } from '../../core/services/auth.service';
import { EntidadFinanciera, Saldo, Operacion } from '../../core/models/models';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { forkJoin, catchError, of } from 'rxjs';

interface SummaryCard {
  label: string;
  value: string;
  icon: string;
  color: string;
  bgColor: string;
  route: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    LoadingSpinnerComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private entidadService = inject(EntidadService);
  private saldoService = inject(SaldoService);
  private operacionService = inject(OperacionService);
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = signal(true);
  totalEntidades = signal(0);
  totalSaldo = signal(0);
  operacionesHoy = signal(0);
  totalOperaciones = signal(0);
  recentOperaciones = signal<Operacion[]>([]);
  topSaldos = signal<Saldo[]>([]);

  currentUser = this.authService.currentUser;

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading.set(true);

    forkJoin({
      entidades: this.entidadService.listar(0, 100).pipe(catchError(() => of(null))),
      saldos: this.saldoService.listar(0, 100).pipe(catchError(() => of(null))),
      operaciones: this.operacionService.listar(0, 5).pipe(catchError(() => of(null))),
    }).subscribe({
      next: ({ entidades, saldos, operaciones }) => {
        if (entidades) {
          const activas = entidades.content.filter((e: EntidadFinanciera) => e.estadoEntidad === 'ACTIVO');
          this.totalEntidades.set(activas.length);
        }

        if (saldos) {
          const total = saldos.content.reduce((sum: number, s: Saldo) => sum + (s.montoDisponible || 0), 0);
          this.totalSaldo.set(total);
          this.topSaldos.set(saldos.content.slice(0, 5));
        }

        if (operaciones) {
          this.recentOperaciones.set(operaciones.content);
          this.totalOperaciones.set(operaciones.totalElements);

          const today = new Date().toISOString().split('T')[0];
          const opsHoy = operaciones.content.filter((o: Operacion) =>
            o.fechaOperacion && o.fechaOperacion.startsWith(today)
          );
          this.operacionesHoy.set(opsHoy.length);
        }

        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  getSummaryCards(): SummaryCard[] {
    return [
      {
        label: 'Entidades Activas',
        value: this.totalEntidades().toString(),
        icon: 'account_balance',
        color: '#0D47A1',
        bgColor: '#e3f2fd',
        route: '/entidades',
      },
      {
        label: 'Saldo Disponible Total',
        value: this.formatCurrency(this.totalSaldo()),
        icon: 'account_balance_wallet',
        color: '#2E7D32',
        bgColor: '#e8f5e9',
        route: '/saldos',
      },
      {
        label: 'Operaciones Hoy',
        value: this.operacionesHoy().toString(),
        icon: 'swap_horiz',
        color: '#e65100',
        bgColor: '#fff3e0',
        route: '/operaciones',
      },
      {
        label: 'Total Operaciones',
        value: this.totalOperaciones().toString(),
        icon: 'insert_chart',
        color: '#6a1b9a',
        bgColor: '#f3e5f5',
        route: '/reportes',
      },
    ];
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2,
    }).format(value);
  }

  formatDate(date: string | null | undefined): string {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  getInitials(): string {
    const user = this.currentUser();
    if (!user) return '?';
    return `${user.nombre.charAt(0)}${user.apellido.charAt(0)}`.toUpperCase();
  }

  getFullName(): string {
    const user = this.currentUser();
    if (!user) return '';
    return `${user.nombre} ${user.apellido}`;
  }
}
