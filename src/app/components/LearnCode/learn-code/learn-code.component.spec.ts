import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnCodeComponent } from './learn-code.component';

describe('LearnCodeComponent', () => {
  let component: LearnCodeComponent;
  let fixture: ComponentFixture<LearnCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
