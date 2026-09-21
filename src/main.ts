import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter, withInMemoryScrolling } from "@angular/router";
import { provideHttpClient, withInterceptors, withXhr } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { importProvidersFrom, LOCALE_ID } from "@angular/core";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { AppComponent } from "./app.component";
import { routes } from "./app.routes";
import { authInterceptor } from "./core/interceptors/auth.interceptor";
import { errorInterceptor } from "./core/interceptors/error.interceptor";
import { loadingInterceptor } from "./core/interceptors/loading.interceptor";
import {
  HashLocationStrategy,
  LocationStrategy,
  registerLocaleData,
} from "@angular/common";
import localEs from "@angular/common/locales/es";

registerLocaleData(localEs, "es", "es-ES");

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: "top" }),
    ),
    {
      provide: LOCALE_ID,
      useValue: "es",
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    provideHttpClient(
      withXhr(),
      withInterceptors([authInterceptor, errorInterceptor, loadingInterceptor]),
    ),
    provideAnimations(),
    importProvidersFrom(
      MatNativeDateModule,
      MatDialogModule,
      MatSnackBarModule,
    ),
  ],
}).catch((err) => console.error(err));
