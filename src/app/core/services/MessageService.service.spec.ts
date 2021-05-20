/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MessageServiceService } from './MessageService.service';

describe('Service: MessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageServiceService]
    });
  });

  it('should ...', inject([MessageServiceService], (service: MessageServiceService) => {
    expect(service).toBeTruthy();
  }));
});
