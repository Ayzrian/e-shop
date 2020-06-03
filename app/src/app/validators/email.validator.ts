import {
  AbstractControl,
  AsyncValidator,
  NG_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import {Directive, Optional} from '@angular/core';
import {UsersApiService} from '../services/users-api.service';

@Directive({
  selector: '[appEmailValidator]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: EmailValidator, multi: true},
  ],
})
export class EmailValidator implements AsyncValidator {
  private invertLogic = false;

  constructor(
    private usersApiService: UsersApiService,
  ) {
  }

  invert() {
    this.invertLogic = true;
    return this;
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> {
    return this.usersApiService
      .isUserWithEmailExists(control.value)
      .then((isExists) => {
        if (isExists && !this.invertLogic) {
          return {
            emailExists: 'Exists',
          };
        } else if (!isExists && this.invertLogic) {
          return {
            emailNotExists: 'Not Exists',
          };
        }
        return null;
      });
  }
}
