import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef
} from "@angular/core";

@Component({
  selector: "div.invalid-feedback",
  template: "{{_text}}",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormControlErrorComponent {
  _text: string;
  @Input() set text(val: string) {
    this._text = val;
    this.cdr.detectChanges();
  }
  constructor(private cdr: ChangeDetectorRef) {}
}
