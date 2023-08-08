import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { EMPTY, Observable, of } from "rxjs";
import {catchError, filter, map, retry, tap} from 'rxjs/operators';
import { AuthData } from "../admin-auth.reducer";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Store, select } from "@ngrx/store";
import { getAuthData, getServerError } from "../admin-auth.selectors";
import { loginFailed } from "../admin-auth.actions";

@Injectable({
    providedIn: 'root'
  })
export class AuthService {
  isAuth$ = this.store$.pipe(
    select(getAuthData),
    filter(authData => authData !== undefined),
    map(authData => !!authData)
  );

  constructor(
    private httpClient: HttpClient,
    private jwtHelperService: JwtHelperService,
    private store$: Store) {
    }

  login(body: {login: string, password: string}) {
    return this.httpClient.post<{accessToken: string}>(
      'http://localhost:3000/auth/login',
      body,
    ).pipe(
      map(res => ({
        ...res,
        ...this.jwtHelperService.decodeToken(res.accessToken)
      })),
    )
  }

  refresh(): Observable<AuthData> {
    return this.httpClient.post<AuthData>(
      'http://localhost:3000/auth/refresh', {}
    ).pipe(
      map(res => ({
        ...res,
        ...this.jwtHelperService.decodeToken(res.accessToken)
      }))
    )
  }
}