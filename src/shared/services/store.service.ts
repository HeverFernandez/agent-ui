import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class StoreService {
  isAlertSubject = new BehaviorSubject<boolean>(false);
}
