import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingScreenComponent } from './testing-screen.component';

describe('TestingScreenComponent', () => {
  let component: TestingScreenComponent;
  let fixture: ComponentFixture<TestingScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestingScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestingScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
