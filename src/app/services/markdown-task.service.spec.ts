import { TestBed } from '@angular/core/testing';

import { MarkdownTaskService } from './markdown-task.service';

describe('MarkdownTaskServiceService', () => {
  let service: MarkdownTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkdownTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
