import { TestBed } from '@angular/core/testing';

import { TestTastService } from './test-tast.service';

describe('TestTastService', () => {
  let service: TestTastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestTastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
