import { HttpInterceptorFn } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
        }
      },
    })
  );
};
