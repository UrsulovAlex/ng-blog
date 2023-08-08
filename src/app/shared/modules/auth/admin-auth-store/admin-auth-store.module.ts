import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, StoreModule } from '@ngrx/store';
import { ADMIN_AUTH_FEATURE_NAME, adminAuthReducer } from './store/admin-auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AdminAuthEffects } from './store/admin-auth.effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AdminAuthInterceptor } from './store/interceptors/admin-auth.interceptor';
import { initAdminAuth } from './store/admin-auth.actions';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatSnackBarModule,
    StoreModule.forFeature(
      ADMIN_AUTH_FEATURE_NAME,
      adminAuthReducer
    ),
    JwtModule.forRoot({
      config: {
        tokenGetter: request => request as any
      }
    }),
    EffectsModule.forFeature([AdminAuthEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AdminAuthInterceptor,
      multi: true,
    },
  ],
})
export class AdminAuthStoreModule { 
  constructor(store$: Store) {
    store$.dispatch(initAdminAuth());
  }
}
