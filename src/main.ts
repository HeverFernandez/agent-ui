import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter, withInMemoryScrolling } from "@angular/router";
import { provideHttpClient, withInterceptors, withXhr } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { importProvidersFrom } from "@angular/core";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { AppComponent } from "./app.component";
import { routes } from "./app.routes";
import { authInterceptor } from "./core/interceptors/auth.interceptor";
import { errorInterceptor } from "./core/interceptors/error.interceptor";
import { loadingInterceptor } from "./core/interceptors/loading.interceptor";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: "top" }),
    ),
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    provideHttpClient(withXhr(), 
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
