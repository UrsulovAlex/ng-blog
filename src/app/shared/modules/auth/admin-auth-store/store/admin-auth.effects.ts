import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fromEvent, timer} from 'rxjs';
import { extractLoginData, initAdminAuth, login, loginSuccess, logout, logoutSuccess } from "@shared/modules/auth/admin-auth-store/store/admin-auth.actions";
import { AuthData } from "@shared/modules/auth/admin-auth-store/store/admin-auth.reducer";
import { distinctUntilChanged, filter, first, map, skip, switchMap, tap} from 'rxjs/operators';
import { AuthService } from "@shared/modules/auth/admin-auth-store/store/services/auth.service";
import { Store, select } from "@ngrx/store";
import { getAuthData, isAuth } from "@shared/modules/auth/admin-auth-store/store/admin-auth.selectors";
import { Router } from "@angular/router";
import { Roles } from "@shared/enum/roles.enum";
import { Location } from "@angular/common";

@Injectable()
export class AdminAuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private store$: Store,
        private router: Router,
        private location: Location){}

    login$ = createEffect(() => this.actions$.pipe(
        ofType(login),
        switchMap((login) => this.authService.login({
            login: login.login,
            password: login.password,
        }).pipe(
            map(authData => {
                return loginSuccess( { authData } )
            }),
        )),
    ));

    refresh$ = createEffect(() => this.actions$.pipe(
        ofType(loginSuccess),
        switchMap(({authData}) => timer(authData.exp * 1000 - 60 * 1000 - Date.now())),
        switchMap(() => this.store$.pipe(
            select(isAuth),
            first(),
            filter(isAdminAuth => isAdminAuth),
        )),
        switchMap(() => this.authService.refresh()),
        map((authData: AuthData) =>  loginSuccess( {authData})),
    ));

    saveAuthDataToLocalStorage$ = createEffect(() => this.actions$.pipe(
        ofType(loginSuccess),
        tap( ({ authData }) => {
            localStorage.setItem('authData', JSON.stringify(authData));
        }),

    ), { dispatch: false });

    extractLoginData$ = createEffect(() => this.actions$.pipe(
        ofType(initAdminAuth, extractLoginData),
        map(() => {
            const authDataString = localStorage.getItem('authData');
            if (!authDataString) {
              return logoutSuccess();
            }
      
            const authData: AuthData = JSON.parse(authDataString);
      
            if ((authData.exp * 1000 - 10 * 1000 - Date.now()) < 0) {
              return logoutSuccess();
            }
      
            return loginSuccess({ authData });
        })
    ));

    listenStorageEffect$ = createEffect(() => this.actions$.pipe(
        ofType(initAdminAuth),
        switchMap(() => fromEvent(window, 'storage')),
        map(() => extractLoginData()),
    ));

    listenAuthorizeEffect$ = createEffect(() => this.actions$.pipe(
        ofType(initAdminAuth),
        switchMap(() => this.authService.isAuth$),
        filter(authData => authData !== undefined),
        map(authData => !!authData),
        distinctUntilChanged(),
        skip(1),
        switchMap(() => this.store$.pipe(
            select(getAuthData),
            filter(getAuthData => getAuthData?.role !== undefined),
            tap(isAuthorized => {
                const adminPath = this.location.path().split("/").includes(Roles.admin);      
                if (!adminPath && (isAuthorized!.role === Roles.admin)) {
                    this.router.navigate(['/admin']);
                } else if (isAuthorized!.role !== Roles.user) {
                    logoutSuccess();
                }
            })
        ), 
    )),{dispatch: false});

    logout$ = createEffect(() => this.actions$.pipe(
        ofType(logout),
        map(() => {
            localStorage.removeItem('authData');
            this.router.navigate(['/home']);
            return logoutSuccess();
        })
    ), {dispatch: false});
}