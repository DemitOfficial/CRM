/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DatashareService } from './datashare.service';

describe('Service: Datashare', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatashareService]
    });
  });

  it('should ...', inject([DatashareService], (service: DatashareService) => {
    expect(service).toBeTruthy();
  }));
});
