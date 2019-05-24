import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NewPackageComponent } from "./new-package/new-package.component";
import { FormControlErrorDirective } from "./form-control-error/form-control-error.directive";
import { FormControlErrorComponent } from "./form-control-error/form-control-error.component";
import { CustomServicesInputComponent } from './custom-services-input/custom-services-input.component';
import { NestedContactFormComponent } from './new-package/nested-contact-form/nested-contact-form.component';
import { NestedAddressFormComponent } from './new-package/nested-address-form/nested-address-form.component';
import { AbstractNestedFormComponent } from './shared/abstract-nested-form.component';

@NgModule({
  declarations: [AppComponent, NewPackageComponent, FormControlErrorDirective, FormControlErrorComponent, CustomServicesInputComponent, NestedContactFormComponent, 
    NestedAddressFormComponent, AbstractNestedFormComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  entryComponents: [FormControlErrorComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
