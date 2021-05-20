/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QuotationsService } from './quotations.service';

describe('Service: Quotations', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuotationsService]
    });
  });

  it('should ...', inject([QuotationsService], (service: QuotationsService) => {
    expect(service).toBeTruthy();
  }));
});
