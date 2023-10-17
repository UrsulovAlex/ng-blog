import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminAuthComponent } from '@modules/web/admin-auth/admin-auth.component'
import { Store, StoreModule } from '@ngrx/store';

describe('AdminAuthComponent', () => {
    let component: AdminAuthComponent;
    let fixture: ComponentFixture<AdminAuthComponent>;

    beforeEach(async () => { 
        await TestBed.configureTestingModule({
            imports: [
                AdminAuthComponent,
                StoreModule.forRoot(),
                RouterTestingModule,
            ],
            providers: [
                Store,
                provideAnimations()
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    })


    beforeEach(() => {
        fixture = TestBed.createComponent(AdminAuthComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the AdminAuthComponent', () => {
        expect(component).toBeTruthy();
    });

    it('should find the <h2> with text register false)', () => {
        const register = component.initFormTamplate(false);
        const titleDebug: DebugElement = fixture.debugElement;
        const titleEl: HTMLElement = titleDebug.nativeElement;
        const h_2 = titleEl.querySelector('h2')!;
        fixture.detectChanges();
        expect(h_2.textContent).toBe('Sign up');
        expect(register).toBeFalse();
    });

    it('should find the <h2> with text register true)', () => {
        const register = component.initFormTamplate(true);
        const titleDebug: DebugElement = fixture.debugElement;
        const titleEl: HTMLElement = titleDebug.nativeElement;
        const h_2 = titleEl.querySelector('h2')!;
        fixture.detectChanges();
        expect(h_2.textContent).toBe('Log in');
        expect(register).toBeTruthy();
    });
})