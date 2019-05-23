import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  ValidatorFn,
  FormGroup,
  ValidationErrors
} from "@angular/forms";

@Component({
  selector: "app-custom-services-input",
  templateUrl: "./custom-services-input.component.html",
  styleUrls: ["./custom-services-input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomServicesInputComponent,
      multi: true
    }
  ]
})
export class CustomServicesInputComponent implements ControlValueAccessor {
  @Input() options: Array<any>;

  @Input() set tabindex(index: number) {
    this._tabindex = index;
  }
  get tabindex() {
    return this.disabled ? undefined : this._tabindex;
  }

  @Input() disabled: boolean;

  focusedItem: HTMLDivElement;

  private internalState = [];

  private _tabindex: number = 0;

  private onModelChange: Function = () => {};

  private onModelTouched: Function = () => {};

  constructor(private cd: ChangeDetectorRef) {}

  writeValue(internalState: any): void {
    this.internalState = internalState;
    this.cd.markForCheck();
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  setDisabledState(val: boolean): void {
    this.disabled = val;
    this.focusedItem = null;
  }

  onFocus(event: Event) {
    if (!this.disabled) {
      this.focusedItem = <HTMLDivElement>event.target;
    }
  }

  onBlur() {
    if (!this.disabled) {
      this.focusedItem = null;
      this.onModelTouched();
    }
  }

  selectService(event, option) {
    if (!this.disabled) {
      const index = this.findItemIndex(option);
      if (index != -1) {
        this.internalState = this.internalState.filter((val, i) => i !== index);
      } else {
        this.internalState = this.internalState
          ? [...this.internalState, option]
          : [option];
      }
      this.onModelChange(this.internalState);
    }
  }

  findItemIndex(option): number {
    return this.internalState
      ? this.internalState.findIndex(val => val.id === option.id)
      : -1;
  }

  isSelected(option) {
    return this.findItemIndex(option) != -1;
  }
}

export const maxPriceValidator: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const sumPrice = (control.value || [])
    .map(service => service.price)
    .reduce((sum, current) => sum + current, 0);
  return sumPrice > 10 ? { priceTooBig: true } : null;
};
