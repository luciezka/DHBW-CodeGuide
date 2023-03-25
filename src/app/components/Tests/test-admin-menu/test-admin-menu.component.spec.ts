import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAdminMenuComponent } from './test-admin-menu.component';

describe('TestAdminMenuComponent', () => {
  let component: TestAdminMenuComponent;
  let fixture: ComponentFixture<TestAdminMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestAdminMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestAdminMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
