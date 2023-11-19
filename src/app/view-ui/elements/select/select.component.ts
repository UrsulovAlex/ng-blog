import { ChangeDetectionStrategy, Component, Input, OnInit,} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { SelectType } from './select.config';
import { ENUM_FORM_GROUP } from '@shared/enum/formGroup.enem';
import { FormcontrolValidationMsgDirective } from '@shared/derectives/formcontrol-validation-msg.directive';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, NgIf, NgFor, NgClass, FormcontrolValidationMsgDirective],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent<T = SelectType> implements OnInit {
  @Input() control!: FormControl;
  @Input() label: string = '';
  @Input() value: SelectType[] = [];
  @Input() placeholder: string = '';
  @Input() required: boolean = true;
  @Input() typeOfFormGroup: ENUM_FORM_GROUP = ENUM_FORM_GROUP.login_register;
  @Input() currentControlName: string = 'login';
  // CURRENT_TYPE_ENUM = CURRENT_TYPE_ENUM; todo
  errorMessages: string[] | null = [];

  showError(event: string[] | null): void {
    console.log('showError', event);
    event?.length ? this.errorMessages = event : this.errorMessages = null;
  }

  ngOnInit(): void {
  this.control.valueChanges.subscribe(data =>console.log('data', data));
    // this.CURRENT_TYPE_ENUM[checkTypeOfdata(this.value[1])]
  }

  setValue(event: MatSelectChange) {
    this.control.setValue(event.value);
  }
}
