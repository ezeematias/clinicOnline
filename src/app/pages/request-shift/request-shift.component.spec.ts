import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestShiftComponent } from './request-shift.component';

describe('RequestShiftComponent', () => {
  let component: RequestShiftComponent;
  let fixture: ComponentFixture<RequestShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestShiftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
