import { NgClass } from "@angular/common";
import {
  Component,
  inject,
  input,
  ChangeDetectionStrategy,
} from "@angular/core";
import { AlertI } from "../../interface/alert.interface";
import { AlertService } from "../../services/alert.service";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "tyn-alert",
  imports: [NgClass, MatIconModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"],
})
export class AlertComponent {
  alertMenu = input.required<AlertI>();
  _alertService = inject(AlertService);
}
