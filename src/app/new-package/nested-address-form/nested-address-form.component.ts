import { Component, OnInit } from "@angular/core";
import { FormGroup, ControlContainer, NgForm } from "@angular/forms";

@Component({
  selector: "app-nested-address-form",
  templateUrl: "./nested-address-form.component.html",
  styleUrls: ["./nested-address-form.component.scss"],
  providers: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class NestedAddressFormComponent {
  constructor(public container: ControlContainer) {}
}
