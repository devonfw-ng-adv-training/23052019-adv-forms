import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { map } from "rxjs/operators";

@Component({
  selector: "app-new-package",
  templateUrl: "./new-package.component.html",
  styleUrls: ["./new-package.component.scss"]
})
export class NewPackageComponent implements OnInit {
  newPostForm: FormGroup;
  submitedData;
  availableServices;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.availableServices = this.route.snapshot.data.availableServices;
    const serviceControls = this.availableServices.map(service => this.fb.control(false));
    
    const address = this.fb.group({
      city: ["", [Validators.required, Validators.maxLength(20)]],
      street: ["", Validators.required]
    });
    const contact = this.fb.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      telNo: ""
    });
    this.newPostForm = this.fb.group({
      contact,
      address,
      services: this.fb.array(serviceControls)
    });

    this.route.data
      .pipe(
        map(data => data.postData),
        map(postData => {
          const services = this.availableServices.map(
            availableService =>
              !!postData.services.find(
                userService => userService.id === availableService.id
              )
          );
          return { ...postData, services };
        })
      )
      .subscribe(data => this.newPostForm.patchValue(data));
  }
  submit() {
    const formData = this.newPostForm.value;
    const services = formData.services
      .map((service, index) => service && this.availableServices[index])
      .filter(val => val);

    this.submitedData = { ...formData, services };
  }
  reset() {
    this.newPostForm.reset({
      contact: {
        firstname: "",
        lastname: "",
        telNo: ""
      },
      address: {
        city: "",
        street: ""
      },
      services: [false, false, false]
    });
  }
}
