import { ChangeDetectionStrategy, Component, Input, OnInit,} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { CURRENT_TYPE_ENUM, SelectType, checkTypeOfdata } from './select.config';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, NgFor, NgIf],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent<T = SelectType> implements OnInit {
  @Input() control!: FormControl;
  @Input() label: string = '';
  @Input() value: SelectType[] = [];
  CURRENT_TYPE_ENUM = CURRENT_TYPE_ENUM;

  ngOnInit(): void {
    this.CURRENT_TYPE_ENUM[checkTypeOfdata(this.value[0])]
  }

  setValue(event: MatSelectChange) {
    this.control.setValue(event.value);
  }

  displayErrors() {
    const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
  }

}
