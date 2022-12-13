import { TestBed } from '@angular/core/testing';

import { FlashcardTaskService } from './flashcard-task.service';

describe('FlashcardTaskServiceService', () => {
  let service: FlashcardTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlashcardTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
