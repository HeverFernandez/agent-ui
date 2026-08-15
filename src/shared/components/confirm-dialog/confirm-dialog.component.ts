import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Inject } from '@angular/core';

interface ConfirmDialogData {
  titulo: string;
  mensaje: string;
  botonConfirmar: string;
  botonCancelar: string;
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.titulo }}</h2>
    <mat-dialog-content>
      <p>{{ data.mensaje }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="cancelar()">{{ data.botonCancelar }}</button>
      <button mat-raised-button color="warn" (click)="confirmar()">{{ data.botonConfirmar }}</button>
    </mat-dialog-actions>
  `,
})
export class ConfirmDialogComponent {
  private dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {}

  confirmar(): void {
    this.dialogRef.close(true);
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}
