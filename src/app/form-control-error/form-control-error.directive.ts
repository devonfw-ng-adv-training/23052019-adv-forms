import {
  Directive,
  ComponentRef,
  Self,
  ViewContainerRef,
  ComponentFactoryResolver,
  Renderer2,
  ElementRef,
  OnDestroy,
  OnInit
} from "@angular/core";
import { NgControl } from "@angular/forms";

import { filter, takeUntil } from "rxjs/operators";
import { of, merge, Subject } from "rxjs";

import { FormControlErrorComponent } from "./form-control-error.component";

@Directive({
  selector: "[formControlName],[formControl]"
})
export class FormControlErrorDirective implements OnDestroy, OnInit {
  ref: ComponentRef<FormControlErrorComponent>;
  private  boss$ = new Subject<undefined>();
  constructor(
    private vcr: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    @Self() private control: NgControl,
    private renderer: Renderer2,
    private hostElement: ElementRef<HTMLFormElement>
  ) {}

  ngOnInit(): void {
    const validity$ = merge(of({}), this.control.statusChanges).pipe(takeUntil(this.boss$));

    const invalid$ = validity$.pipe(filter(() => this.control.invalid && this.control.dirty));
    const valid$ = validity$.pipe(filter(() => this.control.valid));

    invalid$.subscribe(() => this.addErrorComponent());
    valid$.subscribe(() => this.removeErrorComponent());
  }
  ngOnDestroy(): void {
    this.boss$.next();
    this.boss$.complete();
    this.removeErrorComponent();
  }
  private addErrorComponent() {
    if (!this.ref) {
      const factory = this.resolver.resolveComponentFactory(
        FormControlErrorComponent
      );
      this.ref = this.vcr.createComponent(factory);
      this.renderer.addClass(this.hostElement.nativeElement, "is-invalid");
    }
    this.ref.instance.text = this.control.errors
      ? Object.keys(this.control.errors)[0]
      : undefined;
  }

  private removeErrorComponent() {
    if (this.ref) {
      this.renderer.removeClass(this.hostElement.nativeElement, "is-invalid");
      this.ref.destroy();
      this.ref = undefined;
    }
  }
}
