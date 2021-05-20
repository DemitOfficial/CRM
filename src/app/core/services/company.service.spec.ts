/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConpanyService } from './company.service';

describe('Service: Conpany', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConpanyService]
    });
  });

  it('should ...', inject([ConpanyService], (service: ConpanyService) => {
    expect(service).toBeTruthy();
  }));
});
