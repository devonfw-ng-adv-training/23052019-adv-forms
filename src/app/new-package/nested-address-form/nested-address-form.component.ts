import { Component } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  AbstractControl,
  ValidationErrors,
  Validator,
  NG_VALIDATORS
} from "@angular/forms";

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
export class NestedAddressFormComponent
  implements ControlValueAccessor, Validator {
  addressForm: FormGroup;

  private onModelTouched: Function = () => {};

  constructor(public fb: FormBuilder) {
    this.addressForm = this.fb.group({
      city: ["", [Validators.required, Validators.maxLength(20)]],
      street: ["", Validators.required]
    });
  }
  writeValue(value: any): void {
    value && this.addressForm.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn): void {
    this.addressForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.addressForm.disable({emitEvent:false}) : this.addressForm.enable({emitEvent:false});
  }
  validate(c: AbstractControl): ValidationErrors | null {
    return this.addressForm.invalid ? { invalidNestedForm: true } : null;
  }
}
