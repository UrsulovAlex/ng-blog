import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { EMPTY, Observable, catchError, retry } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class InterceptorErrorInterceptor implements HttpInterceptor {

  constructor(
    private snackBar: MatSnackBar
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError( err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
              this.snackBar.open(err.statusText, 'close', {duration: 5000});
          }
        }
        throw err;
      }),
    )
  }
}
