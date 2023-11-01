import { Directive, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
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
export class FormcontrolValidationMsgDirective implements OnInit{
  private destroyService$ = inject(DestroyService);
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
      takeUntil(this.destroyService$),
    ).subscribe((status: FormControlStatus) => {
        if (status === 'INVALID') {
          this.showErrors.emit(getValidationErrors(this.currentControl, this.currentFormGroup, this.currentControlName));
        } else {
          this.showErrors.emit(getValidationErrors(this.currentControl));
        }
      }
    )
  }
}
