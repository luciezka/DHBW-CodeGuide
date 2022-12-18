import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammingBasicsComponent } from './programming-basics.component';

describe('ProgrammingBasicsComponent', () => {
  let component: ProgrammingBasicsComponent;
  let fixture: ComponentFixture<ProgrammingBasicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgrammingBasicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgrammingBasicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
