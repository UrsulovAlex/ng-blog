import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as adminAuth from '@shared/modules/auth/admin-auth-store/store/admin-auth.selectors';
import { login } from '@shared/modules/auth/admin-auth-store/store/admin-auth.actions';
import { DestroyService } from '@shared/services/destroy.service';
import { InputFormComponent } from '@view-ui/elements/input-form/input-form.component';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormControl  } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { ENUM_FORM_GROUP } from '@shared/enum/formGroup.enem';

@Component({
  selector: 'app-admin-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputFormComponent, MatButtonModule, MatCardModule],
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.scss'],
  providers: [DestroyService],
})
export class AdminAuthComponent implements OnInit{
  private formBuilder = inject(FormBuilder);
  private store$ = inject(Store);
  loading$: Observable<boolean> = this.store$.pipe(select(adminAuth.getLoading));
  loaded$: Observable<boolean> = this.store$.pipe(select(adminAuth.getLoaded));
  serverError$: Observable<string> = this.store$.pipe(select(adminAuth.getServerError));
  router = inject(ActivatedRoute)
  formGroup!:FormGroup;
  title = 'Log in';
  register = false;
  displayMessage: { [key: string]: string } = {};
  currentFormGroup: ENUM_FORM_GROUP = ENUM_FORM_GROUP.login_register;

  ngOnInit(): void {
    this.initFormTamplate(this.router.snapshot.data['register']);
    this.initRegisterForms();
  }

  initFormTamplate(checkRegister: boolean ): boolean {
    this.title = checkRegister ? 'Log in' : 'Sign up';
    return this.register = checkRegister;
  }

  initRegisterForms(): void {
    this.formGroup = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    }, {updateOn: 'blur'} );

    if (!this.register) {
      this.formGroup.addControl('nickName', new FormControl('', [Validators.required, Validators.minLength(3)]));
    }
  }

  onLogin(loginPayload: {login:string, password: string}) {
    this.store$.dispatch(login(loginPayload));
  }

  onSubmit() {
    this.onLogin(this.formGroup.value);
  }
}
