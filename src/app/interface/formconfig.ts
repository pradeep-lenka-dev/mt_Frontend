import { ValidatorFn } from '@angular/forms';

export interface Formconfig {
   fields: { [key: string]: string }; // Field name and corresponding label
    validations?: { [key: string]: ValidatorFn | ValidatorFn[] }; // Validation rules
}
