import { Directive, EventEmitter, HostListener, Input, Output, inject } from '@angular/core';
import { AbstractControl, FormControlStatus } from '@angular/forms';
import { ENUM_FORM_GROUP } from '@shared/enum/formGroup.enem';
import { getValidationErrors } from '@shared/helpers/getValidationErrors';
import { DestroyService } from '@shared/services/destroy.service';
import { EMPTY, debounceTime, of, switchMap, takeUntil } from 'rxjs';

@Directive({
  selector: '[appFormcontrolValidationMsg]',
  standalone: true,
  providers: [DestroyService],
})
export class FormcontrolValidationMsgDirective {
  private destroyService$ = inject(DestroyService);
  @Input() currentControl!: AbstractControl;
  @Input() currentFormGroup: ENUM_FORM_GROUP = ENUM_FORM_GROUP.login_register;
  @Input() currentControlName: string = '';
  @Output() showErrors = new EventEmitter<string[] | null>();
  @HostListener('blur') onBluer() {
    if(this.currentControl.touched || this.currentControl.dirty || this.currentControl.invalid) {
      this.showErrors.emit(getValidationErrors(this.currentControl, this.currentFormGroup, this.currentControlName));
    } else {
      this.showErrors.emit(getValidationErrors(this.currentControl));
    }
  }
}
