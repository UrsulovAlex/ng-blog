import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminAuthStoreModule } from '@shared/modules/auth/admin-auth-store/admin-auth-store.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorErrorInterceptor } from '@shared/interceptors/interceptor-error.interceptor';
import { FormcontrolValidationMsgDirective } from '@shared/derectives/formcontrol-validation-msg.directive';
import { LoadingInterceptor } from '@shared/interceptors/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([]),
    AdminAuthStoreModule,
    FormcontrolValidationMsgDirective
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorErrorInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
