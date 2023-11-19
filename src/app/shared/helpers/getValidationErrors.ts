import { AbstractControl, ValidationErrors } from "@angular/forms";
import { ENUM_FORM_GROUP } from "@shared/enum/formGroup.enem";
import { IBaseObject } from "@shared/models_config_interface/baseObject.interface";
import { VALIDATION_ERROR_MESSAGE } from "@shared/models_config_interface/validation-message-config";

export function getValidationErrors(control: AbstractControl, formGroup?: ENUM_FORM_GROUP, currentControl?: string): string[] | null {
  const currentErrorMessage: string[] = [];  
  const validationErrors: ValidationErrors | null = control.errors;

  if (!validationErrors) { return null }

  const currentFormGroup: IBaseObject = VALIDATION_ERROR_MESSAGE.get(formGroup);

  if (currentControl?.length) {
    for ( const key in validationErrors) {
        currentErrorMessage.push(currentFormGroup[currentControl][key]);
    }
  }
  return currentErrorMessage;
}