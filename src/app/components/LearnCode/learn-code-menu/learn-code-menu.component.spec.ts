import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnCodeMenuComponent } from './learn-code-menu.component';

describe('LearnCodeMenuComponent', () => {
  let component: LearnCodeMenuComponent;
  let fixture: ComponentFixture<LearnCodeMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnCodeMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnCodeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
