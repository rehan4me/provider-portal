import { Component, OnInit } from '@angular/core';
import { Provider } from 'src/app/model/providers';
import { ActivatedRoute, Router } from '@angular/router';
import { PROVIDERS_LIST } from 'src/app/mock/providers';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

  provider: Provider;
  providerForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    this.providerForm = formBuilder.group({
      serialNumber: ['', Validators.required],
      name: ['', Validators.required],
      licence: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      created: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  get providerFormControls() { return this.providerForm.controls; }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      if (param.id) {
        this.provider = PROVIDERS_LIST.find((data: Provider) => data.serialNumber === Number(param.id));
      }
    });
    this.setValues();
  }


  setValues(): void {
    for (const control in this.providerFormControls) {
      if (control) {
        this.providerFormControls[control].setValue(this.provider[control]);
      }
    }
  }


  onFormSubmit(): void {
    const idx = PROVIDERS_LIST.findIndex((data: Provider) => data.serialNumber === this.providerForm.value.serialNumber);
    PROVIDERS_LIST.splice(idx, 1, this.providerForm.value);
    this.closeDcoument();
  }

  closeDcoument(): void {
    this.router.navigate(['providers']);
  }
}
