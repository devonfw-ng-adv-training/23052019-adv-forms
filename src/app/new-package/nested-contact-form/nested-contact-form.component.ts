import { Component, Injector } from "@angular/core";
import {
  FormBuilder,
  Validators,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS
} from "@angular/forms";

import { AbstractNestedFormComponent } from "../../shared/abstract-nested-form.component";

@Component({
  selector: "app-nested-contact-form",
  templateUrl: "./nested-contact-form.component.html",
  styleUrls: ["./nested-contact-form.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NestedContactFormComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: NestedContactFormComponent,
      multi: true
    }
  ]
})
export class NestedContactFormComponent extends AbstractNestedFormComponent {
  ngOnInit() {
    this.nestedForm = this.fb.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      telNo: ""
    });
  }
}
