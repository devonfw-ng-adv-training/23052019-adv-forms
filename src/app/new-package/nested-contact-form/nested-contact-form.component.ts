import { Component, OnInit } from "@angular/core";
import { FormGroup, ControlContainer, NgForm } from "@angular/forms";

@Component({
  selector: "app-nested-contact-form",
  templateUrl: "./nested-contact-form.component.html",
  styleUrls: ["./nested-contact-form.component.scss"],
  providers: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class NestedContactFormComponent {
  constructor(public container: ControlContainer) {
  }

}
