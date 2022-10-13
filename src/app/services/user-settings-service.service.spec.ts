import { TestBed } from '@angular/core/testing';

import { UserSettingsServiceService } from './user-settings-service.service';

describe('UserSettingsServiceService', () => {
  let service: UserSettingsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSettingsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
