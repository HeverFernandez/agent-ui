import { Component, inject, signal, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SaldoService } from '../../../core/services/saldo.service';
import { NotificationService } from '../../../core/services/notification.service';
import { DialogService } from '../../../shared/services/dialog.service';
import { Saldo, EstadoSaldo, PageResponse } from '../../../core/models/models';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-saldo-list',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatPaginatorModule, MatSortModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule,
    MatIconModule, MatCardModule, MatTooltipModule, MatProgressSpinnerModule,
    LoadingSpinnerComponent,
  ],
  templateUrl: './saldo-list.component.html',
  styleUrls: ['./saldo-list.component.scss'],
})
export class SaldoListComponent implements OnInit {
  private saldoService = inject(SaldoService);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private dialogService = inject(DialogService);

  loading = signal(true);
  dataSource = new MatTableDataSource<Saldo>([]);
  displayedColumns: string[] = ['idSaldo', 'entidad', 'montoInicial', 'montoDisponible', 'fechaAsignacion', 'estadoSaldo', 'acciones'];

  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  filtroEstado = signal<EstadoSaldo | ''>('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadSaldos();
  }

  loadSaldos(): void {
    this.loading.set(true);
    this.saldoService.listar(this.pageIndex, this.pageSize).subscribe({
      next: (response: PageResponse<Saldo>) => {
        this.dataSource.data = response.content;
        this.totalElements = response.totalElements;
        this.loading.set(false);
      },
      error: () => { this.loading.set(false); },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadSaldos();
  }

  crear(): void { this.router.navigate(['/saldos/nuevo']); }
  editar(saldo: Saldo): void { this.router.navigate(['/saldos/editar', saldo.idSaldo]); }

  eliminar(saldo: Saldo): void {
    this.dialogService.confirmar(
      'Eliminar Saldo',
      `¿Está seguro de eliminar el saldo #${saldo.idSaldo}?`,
      'Eliminar', 'Cancelar'
    ).subscribe((confirmado) => {
      if (confirmado && saldo.idSaldo) {
        this.saldoService.eliminar(saldo.idSaldo).subscribe({
          next: () => { this.notification.success('Saldo eliminado correctamente'); this.loadSaldos(); },
        });
      }
    });
  }

  filtrarPorEstado(estado: EstadoSaldo | ''): void {
    this.filtroEstado.set(estado);
    if (estado === '') {
      this.loadSaldos();
    } else {
      this.loading.set(true);
      this.saldoService.listarPorEstado(estado as EstadoSaldo, this.pageIndex, this.pageSize).subscribe({
        next: (response) => {
          this.dataSource.data = response.content;
          this.totalElements = response.totalElements;
          this.loading.set(false);
        },
        error: () => { this.loading.set(false); },
      });
    }
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'PEN', minimumFractionDigits: 2 }).format(value);
  }

  formatDate(date: string | null | undefined): string {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  getSaldoClass(saldo: Saldo): string {
    if (saldo.montoDisponible <= 0) return 'saldo-agotado';
    if (saldo.montoDisponible < saldo.montoInicial * 0.2) return 'saldo-bajo';
    return 'saldo-ok';
  }
}
