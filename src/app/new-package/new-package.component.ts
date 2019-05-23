import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { map } from "rxjs/operators";
import { maxPriceValidator } from '../custom-services-input/custom-services-input.component';

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
      services: [[]]
    });

    this.route.data
      .pipe(map(data => data.postData))
      .subscribe(data => this.newPostForm.patchValue(data));
  }
  toggleEnable() {
    if (this.newPostForm.enabled) {
      this.newPostForm.disable();
    } else {
      this.newPostForm.enable();
    }
  }
  submit() {
    const formData = this.newPostForm.value;
    this.submitedData = { ...formData };
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
      services: []
    });
  }
}
