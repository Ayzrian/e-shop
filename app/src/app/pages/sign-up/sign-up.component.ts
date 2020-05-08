import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  personalDataForm: FormGroup;
  addressForm: FormGroup;
  paymentForm: FormGroup;

  sexOptions = [
    {
      value: 'M',
      label: 'Male',
    },
    {
      value: 'F',
      label: 'Female',
    },
  ];

  constructor(private fb: FormBuilder) {
    this.personalDataForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      dateOfBirth: [moment.now(), [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      sex: ['M', [Validators.required]],
    });

    this.addressForm = this.fb.group({
      country: ['', [Validators.required, Validators.minLength(3)]],
      city: ['', [Validators.required, Validators.minLength(3)]],
      street: ['', [Validators.required, Validators.minLength(3)]],
      building: ['', [Validators.required, Validators.minLength(1)]],
      // TODO: may  be should remove validator
      flat: ['', [Validators.minLength(1)]],
    });

    this.paymentForm = this.fb.group({
      cardNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
        ],
      ],
      expirationDate: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
      ],
      cvv: [
        '',
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3),
      ],
    });
  }

  isInvalid(form: FormGroup, control: string): boolean {
    console.log(this.personalDataForm.invalid);
    return form.controls[control].invalid;
  }

  getErrorMessage(
    form: FormGroup,
    control: string,
    minLength = 3,
    maxLength = 20
  ): string {
    const {errors} = form.controls[control];
    if (errors) {
      if (errors.required) {
        return 'You must enter a value';
      }

      if (errors.minlength) {
        return 'Min length is ' + minLength;
      }

      if (errors.maxlength) {
        return 'Max length is ' + maxLength;
      }

      if (errors.email) {
        return 'You must enter a valid email';
      }
    }
  }

  isFormValid(): boolean {
    return (
      this.addressForm.invalid ||
      this.personalDataForm.invalid ||
      this.paymentForm.invalid
    );
  }

  signUp() {
    // TODO: implement login page!

    this.personalDataForm.reset();
    this.addressForm.reset();
    this.paymentForm.reset();
  }

  ngOnInit(): void {
  }
}
