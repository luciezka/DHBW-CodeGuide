import { TestBed } from '@angular/core/testing';

import { FlashcardLoadServiceService } from './flashcard-load-service.service';

describe('FlashcardLoadServiceService', () => {
  let service: FlashcardLoadServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlashcardLoadServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
