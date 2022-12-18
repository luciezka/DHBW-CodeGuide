import { TestBed } from '@angular/core/testing';

import { BasicInformationTaskService } from './basic-information-task.service';

describe('BasicInformationTaskService', () => {
  let service: BasicInformationTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicInformationTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
