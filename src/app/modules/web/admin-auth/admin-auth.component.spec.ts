import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminAuthComponent } from '@modules/web/admin-auth/admin-auth.component'
import { Store, StoreModule } from '@ngrx/store';

describe('AdminAuthComponent', () => {
    let component: AdminAuthComponent;
    let fixture: ComponentFixture<AdminAuthComponent>;
    let loginControl: FormControl;
    let passwordControl: FormControl;
    let nickNameControl: FormControl;
    let formGroup: FormGroup;

    beforeEach(async () => { 
        await TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot(),
                RouterTestingModule,
                ReactiveFormsModule,
                FormsModule,
            ],
            providers: [
                Store,
                provideAnimations(),
                {
                    provide: ActivatedRoute,
                    useValue: {
                      snapshot: {
                        data: {
                            register: false,
                        },
                      },
                    },
                },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AdminAuthComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        loginControl = component.formGroup.get('login') as FormControl;
        passwordControl = component.formGroup.get('password') as FormControl;
        formGroup = component.formGroup as FormGroup;
    })

    it('should create the AdminAuthComponent', () => {
        expect(component).toBeTruthy();
    });

    it('should create the formGroup', () => {
        expect(component.formGroup).toBeTruthy();
    });

    it('should find the <h2> with text register true)', () => {
        const newValue = true;
        component.initFormTamplate(newValue);
        const titleDebug: DebugElement = fixture.debugElement;
        const titleEl: HTMLElement = titleDebug.nativeElement;
        const h_2 = titleEl.querySelector('h2')!;
        fixture.detectChanges();
        expect(h_2.textContent).toBe('Log in');
        expect(component.register).toBe(newValue);
        expect(component.formGroup.get('login')).toBeTruthy();
        expect(component.formGroup.get('password')).toBeTruthy();
    });

    it('should find the <h2> with text register false)', () => {
        const newValue = false;
        component.initFormTamplate(newValue);
        const formGroup = component.formGroup;
        const formGroupValues = {
            login: '',
            password: '',
            nickName: ''
        }
        const titleDebug: DebugElement = fixture.debugElement;
        const titleEl: HTMLElement = titleDebug.nativeElement;
        const h_2 = titleEl.querySelector('h2')!;
        fixture.detectChanges();
        expect(h_2.textContent).toBe('Sign up');
        expect(component.register).toBe(newValue);
        expect(component.formGroup.get('login')).toBeTruthy();
        expect(component.formGroup.get('password')).toBeTruthy();
        expect(component.formGroup.get('nickName')).toBeTruthy();
        expect(formGroup.value).toEqual(formGroupValues);
    });

    it('should route register parameters', () => {
        const newValue = false;
        fixture.detectChanges();
        expect(component.router.snapshot.data['register']).toBeFalse();
        expect(component.register).toBe(newValue);
    });

    it('should registration', () => {
        const formElement = fixture.debugElement.nativeElement.querySelector('#login-form');
        const inputElements = formElement.querySelectorAll('input');
        const loginUserElement = formElement.querySelectorAll('input')[0];
        const loginPasswordElement = formElement.querySelectorAll('input')[1];
        const loginNickNameElement = formElement.querySelectorAll('input')[2];

        loginUserElement.value = 'AlexTest';
        loginPasswordElement.value = '1234567';
        loginNickNameElement.value = 'NewUser';

        loginUserElement.dispatchEvent(new Event('input'));
        loginPasswordElement.dispatchEvent(new Event('input'))
        loginNickNameElement.dispatchEvent(new Event('input'))

        const isFormValid = component.formGroup.valid;

        expect(inputElements.length).toEqual(3);

        fixture.whenStable().then(() => {
            expect(isFormValid).toBeTruthy();
        })
    });
})