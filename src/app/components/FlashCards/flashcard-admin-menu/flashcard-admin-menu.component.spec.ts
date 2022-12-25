import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardAdminMenuComponent } from './flashcard-admin-menu.component';

describe('FlashcardAdminMenuComponent', () => {
  let component: FlashcardAdminMenuComponent;
  let fixture: ComponentFixture<FlashcardAdminMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashcardAdminMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashcardAdminMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
