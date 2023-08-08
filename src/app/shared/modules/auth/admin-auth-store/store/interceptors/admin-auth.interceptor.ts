import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { EMPTY, Observable, catchError, first, mergeMap, retry } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { getAccessToken } from '../admin-auth.selectors';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { loginFailed } from '../admin-auth.actions';

@Injectable()
export class AdminAuthInterceptor implements HttpInterceptor {
  private router = inject(Router);
  constructor(
    private store$: Store,
    private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     return this.store$.pipe(
      select(getAccessToken),
      first(),
      mergeMap(token => {
        const authRequst = token ? request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          }
        }) : request;
        return next.handle(authRequst).pipe(
          catchError( err => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this.router.navigate(['/register']);
                this.snackBar.open(err.statusText, 'close', {duration: 5000});
                this.store$.dispatch(loginFailed({serverError: err.message}));
              }
            }
            throw err;
          })
        )
      })
  )}
}
