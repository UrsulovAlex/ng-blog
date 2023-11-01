import { Directive, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { AbstractControl, FormControlStatus } from '@angular/forms';
import { ENUM_FORM_GROUP } from '@shared/enum/formGroup.enem';
import { getValidationErrors } from '@shared/helpers/getValidationErrors';
import { EMPTY, debounceTime, of, switchMap } from 'rxjs';

@Directive({
  selector: '[appFormcontrolValidationMsg]',
  standalone: true,
})
export class FormcontrolValidationMsgDirective implements OnInit{
  @Input() currentControl!: AbstractControl;
  @Input() currentFormGroup: ENUM_FORM_GROUP = ENUM_FORM_GROUP.login_register;
  @Input() currentControlName: string = '';
  @Output() showErrors = new EventEmitter<string[] | null>();

  ngOnInit(): void {
    this.currentControl.statusChanges.pipe(
      debounceTime(800),
      switchMap((status: FormControlStatus) => {
        if (status === 'PENDING' || status === 'DISABLED') {
          //  TODO pending and disable
          return EMPTY;
        }

        return of(status);
      }),
    ).subscribe((status: FormControlStatus) => {
        if (status === 'INVALID') {
          this.showErrors.emit(getValidationErrors(this.currentControl, this.currentFormGroup, this.currentControlName));
          console.log('INVALID', );
        } else {
          this.showErrors.emit(getValidationErrors(this.currentControl));
          console.log('VALID', );
        }
      }
    )
  }
}
