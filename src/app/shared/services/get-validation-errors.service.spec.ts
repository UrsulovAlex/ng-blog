import { TestBed } from '@angular/core/testing';

import { GetValidationErrorsService } from './get-validation-errors.service';

describe('GetValidationErrorsService', () => {
  let service: GetValidationErrorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetValidationErrorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
