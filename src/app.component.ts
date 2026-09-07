import { Component, inject, ChangeDetectionStrategy } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AlertComponent } from "./shared/components/alert/alert.component";
import { AlertService } from "./shared/services/alert.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, AlertComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: "./app.component.html",
})
export class AppComponent {
  _alertService = inject(AlertService);
}
