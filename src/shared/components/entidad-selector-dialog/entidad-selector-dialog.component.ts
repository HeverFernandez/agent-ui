import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EntidadFinanciera } from '../../../core/models/models';

@Component({
  selector: 'app-entidad-selector-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule, MatIconModule, MatInputModule],
  templateUrl: './entidad-selector-dialog.component.html',
  styleUrls: ['./entidad-selector-dialog.component.scss'],
})
export class EntidadSelectorDialogComponent {
  searchText = '';

  constructor(
    private dialogRef: MatDialogRef<EntidadSelectorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { entidades: EntidadFinanciera[] },
  ) {}

  get entidadesFiltradas(): EntidadFinanciera[] {
    const search = this.searchText.trim().toLowerCase();
    if (!search) return this.data.entidades;

    return this.data.entidades.filter((entidad) =>
      `${entidad.denominacion} ${entidad.codigoEntidad}`.toLowerCase().includes(search),
    );
  }

  seleccionar(entidad: EntidadFinanciera): void {
    this.dialogRef.close(entidad);
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
