import { TestBed } from '@angular/core/testing';

import { InterceptorErrorInterceptor } from './interceptor-error.interceptor';

describe('InterceptorErrorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      InterceptorErrorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: InterceptorErrorInterceptor = TestBed.inject(InterceptorErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
