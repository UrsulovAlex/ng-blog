import { FormGroup } from '@angular/forms';

const VALIDATION_MESSAGES = {
  email: {
    required: 'Required',
    email: 'This email is invalid'
  },
  password: {
    required: 'Required',
    minlength: 'The password length must be greater than or equal to 8'
  },
  confirmPassword: {
    required: 'Required',
    match: 'Password does not match'
  },
  firstName: {
    required: 'Required'
  },
  lastName: {
    required: 'Required'
  }
};

export class GenericValidator {
  constructor(private validationMessages: { [key: string]: { [key: string]: string } } = VALIDATION_MESSAGES) {}

  processMessages(container: FormGroup): { [key: string]: string } {
    const messages: any = {};
    for (const controlKey in container.controls) {
      if (container.controls.hasOwnProperty(controlKey)) {
        const controlProperty = container.controls[controlKey];
        if (controlProperty instanceof FormGroup) {
          const childMessages = this.processMessages(controlProperty);
          Object.assign(messages, childMessages);
        } else {
          if (this.validationMessages[controlKey]) {
            messages[controlKey] = '';
            if ((controlProperty.dirty || controlProperty.touched) && controlProperty.errors) {
              Object.keys(controlProperty.errors).map(messageKey => {
                if (this.validationMessages[controlKey][messageKey]) {
                  messages[controlKey] += this.validationMessages[controlKey][messageKey] + ' ';
                }
              });
            }
          }
        }
      }
    }
    return messages;
  }
}