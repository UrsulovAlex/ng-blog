import { ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule,],
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

  displayErrors() {
    const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
  }
}
