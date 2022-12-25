import {TestBed} from '@angular/core/testing';

import {TestTaskService} from './test-task.service';

describe('TestTastService', () => {
  let service: TestTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
