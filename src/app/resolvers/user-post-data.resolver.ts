import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";

import { Observable, of } from "rxjs";

@Injectable({ providedIn: "root" })
export class UserPostDataResolver implements Resolve<Observable<any>> {
  resolve(): Observable<any> {
    return of({
      address: {
        city: "Wroclaw",
        street: ""
      },
      contact: {
        firstname: "Tomasz",
        lastname: "Wawrzyniak",
        telNo: ""
      },
      services: [{ id: 1, name: "Registered", price: 7 }]
    });
  }
}
