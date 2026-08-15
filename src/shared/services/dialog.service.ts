import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  confirmar(
    titulo: string = 'Confirmar acción',
    mensaje: string = '¿Está seguro de realizar esta acción?',
    botonConfirmar: string = 'Confirmar',
    botonCancelar: string = 'Cancelar'
  ): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { titulo, mensaje, botonConfirmar, botonCancelar },
      disableClose: true,
    });

    return dialogRef.afterClosed();
  }
}
