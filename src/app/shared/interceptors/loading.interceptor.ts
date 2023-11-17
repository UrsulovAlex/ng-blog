import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, delay, finalize } from 'rxjs';
import { LoadingService } from '@shared/services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  loadingService = inject(LoadingService);

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.toggleLoading(true);
    return next.handle(request).pipe(
      delay(500),
      finalize(() => this.loadingService.toggleLoading(false)),
    );
  }
}
