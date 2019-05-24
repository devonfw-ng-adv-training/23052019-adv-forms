import { Component } from "@angular/core";
import {
  FormBuilder,
  Validators,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS
} from "@angular/forms";

import { AbstractNestedFormComponent } from "../../shared/abstract-nested-form.component";

@Component({
  selector: "app-nested-address-form",
  templateUrl: "./nested-address-form.component.html",
  styleUrls: ["./nested-address-form.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NestedAddressFormComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: NestedAddressFormComponent,
      multi: true
    }
  ]
})
export class NestedAddressFormComponent extends AbstractNestedFormComponent {
  ngOnInit() {
    this.nestedForm = this.fb.group({
      city: ["", [Validators.required, Validators.maxLength(20)]],
      street: ["", Validators.required]
    });
  }
}
