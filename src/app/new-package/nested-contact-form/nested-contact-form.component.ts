import { Component } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  Validator,
  NG_VALIDATORS,
  AbstractControl,
  ValidationErrors
} from "@angular/forms";

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
export class NestedContactFormComponent
  implements ControlValueAccessor, Validator {
  contactForm: FormGroup;

  private onModelTouched: Function = () => {};

  constructor(public fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      telNo: ""
    });
  }
  writeValue(value: any): void {
    value && this.contactForm.setValue(value, { emitEvent: false });
  }
  registerOnChange(fn): void {
    this.contactForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.contactForm.disable({emitEvent:false}) : this.contactForm.enable({emitEvent:false});
  }
  validate(c: AbstractControl): ValidationErrors | null {
    return this.contactForm.invalid ? { invalidNestedForm: true } : null;
  }
}
