import { TestBed } from '@angular/core/testing';

import { WebRequestService } from './web-request.service';

describe('WebRequestServiceService', () => {
  let service: WebRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
