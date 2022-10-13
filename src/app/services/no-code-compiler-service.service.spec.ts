import { TestBed } from '@angular/core/testing';

import { NoCodeCompilerServiceService } from './no-code-compiler-service.service';

describe('NoCodeCompilerServiceService', () => {
  let service: NoCodeCompilerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoCodeCompilerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
