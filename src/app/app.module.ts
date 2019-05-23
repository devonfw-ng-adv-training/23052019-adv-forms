import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NewPackageComponent } from "./new-package/new-package.component";
import { FormControlErrorDirective } from "./form-control-error/form-control-error.directive";
import { FormControlErrorComponent } from "./form-control-error/form-control-error.component";

@NgModule({
  declarations: [AppComponent, NewPackageComponent, FormControlErrorDirective, FormControlErrorComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  entryComponents: [FormControlErrorComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
