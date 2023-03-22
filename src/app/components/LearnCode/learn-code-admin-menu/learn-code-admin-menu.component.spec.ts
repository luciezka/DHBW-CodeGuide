import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnCodeAdminMenuComponent } from './learn-code-admin-menu.component';

describe('LearnCodeAdminMenuComponent', () => {
  let component: LearnCodeAdminMenuComponent;
  let fixture: ComponentFixture<LearnCodeAdminMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnCodeAdminMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnCodeAdminMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
