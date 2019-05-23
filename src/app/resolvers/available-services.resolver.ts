import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";

import { Observable, of } from "rxjs";

@Injectable({ providedIn: "root" })
export class AvailableServicesResolver implements Resolve<Observable<any>> {
  resolve(): Observable<any> {
    return of([
      { id: 0, name: "Priority", price: "5" },
      { id: 1, name: "Registered", price: "7" },
      { id: 2, name: "Sign required", price: "2" }
    ]);
  }
}