import {
  FormGroup,
  ControlValueAccessor,
  Validator,
  AbstractControl,
  ValidationErrors,
  FormBuilder
} from "@angular/forms";
import { Injector, Component } from "@angular/core";

@Component({ template: '' })
export class AbstractNestedFormComponent
  implements ControlValueAccessor, Validator {
  nestedForm: FormGroup;
  fb: FormBuilder;
  private onModelTouched: Function = () => {};
  constructor(injector: Injector) {
    this.fb = injector.get(FormBuilder);
  }
  writeValue(value: any): void {
    value && this.nestedForm.setValue(value, { emitEvent: false });
  }
  registerOnChange(fn): void {
    this.nestedForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled
      ? this.nestedForm.disable({ emitEvent: false })
      : this.nestedForm.enable({ emitEvent: false });
  }
  validate(c: AbstractControl): ValidationErrors | null {
    return this.nestedForm.invalid ? { invalidNestedForm: true } : null;
  }
}
