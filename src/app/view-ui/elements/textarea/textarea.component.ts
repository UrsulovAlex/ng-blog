import { NgIf, NgFor, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormcontrolValidationMsgDirective } from '@shared/derectives/formcontrol-validation-msg.directive';
import { ENUM_FORM_GROUP } from '@shared/enum/formGroup.enem';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgIf, NgFor, NgClass, FormcontrolValidationMsgDirective],
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent {
  @Input() control!: FormControl;
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() minRows: number = 1;
  @Input() maxRows: number = 5;
  @Input() required: boolean = false;
  @Input() readonly: boolean = false;
  @Input() typeOfFormGroup: ENUM_FORM_GROUP  = ENUM_FORM_GROUP.login_register;
  @Input() currentControlName: string = 'login';
  errorMessages: string[] | null = [];

  showError(event: string[] | null): void {
    this.errorMessages = event;
  }
}
