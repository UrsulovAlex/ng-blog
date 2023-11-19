import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { InputType } from '@shared/types/inputType.type';
import { FormcontrolValidationMsgDirective } from '@shared/derectives/formcontrol-validation-msg.directive';
import { ENUM_FORM_GROUP } from '@shared/enum/formGroup.enem';

@Component({
  selector: 'app-input-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgIf, NgFor, NgClass, FormcontrolValidationMsgDirective], 
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFormComponent {
  @Input() control!: FormControl;
  @Input() label: string = '';
  @Input() inputProperty: InputType = 'text';
  @Input() placeholder: string = '';
  @Input() required: boolean = true;
  @Input() readonly: boolean = false;
  @Input() typeOfFormGroup: ENUM_FORM_GROUP = ENUM_FORM_GROUP.login_register;
  @Input() currentControlName: string = 'login';
  errorMessages: string[] | null = [];

  showError(event: string[] | null): void {
    this.errorMessages = event;
  }
}
