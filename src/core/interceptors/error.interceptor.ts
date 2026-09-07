import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AlertService } from "src/shared/services/alert.service";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const _alertService = inject(AlertService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = "Ocurrió un error inesperado";

      if (error.error instanceof ErrorEvent) {
        message = `Error de conexión: ${error.error.message}`;
      } else if (error.status === 0) {
        message =
          "No se pudo conectar con el servidor. Verifique que el backend esté en ejecución.";
      } else if (error.status === 401) {
        message = "No autorizado. Inicie sesión nuevamente.";
      } else if (error.status === 403) {
        message = "No tiene permisos para realizar esta acción.";
      } else if (error.status === 404) {
        message = "El recurso solicitado no fue encontrado.";
      } else if (error.error && error.error.message) {
        message = error.error.message;
      } else if (error.message) {
        message = error.message;
      }

      _alertService.getAlert("Error", message, "error");
      return throwError(() => error);
    }),
  );
};
