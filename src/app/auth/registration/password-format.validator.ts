import { AbstractControl, ValidatorFn } from '@angular/forms';

export class PasswordFormatValidator {
  static passFormat(): ValidatorFn {
    const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_@$!%*?&#.,;:])[A-Za-z\d-+_@$!%*?&#.,;:]{8,10000}$/;
    return (inputControl: AbstractControl): { [key: string]: boolean } | null => {
      if (regexp.test(inputControl.value)) {
        return null;
      }
      return { passFormat: true };
    };
  }
}
