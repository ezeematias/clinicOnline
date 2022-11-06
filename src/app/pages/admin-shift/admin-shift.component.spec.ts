import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShiftComponent } from './admin-shift.component';

describe('AdminShiftComponent', () => {
  let component: AdminShiftComponent;
  let fixture: ComponentFixture<AdminShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminShiftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
