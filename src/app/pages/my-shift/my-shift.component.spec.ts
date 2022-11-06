import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyShiftComponent } from './my-shift.component';

describe('MyShiftComponent', () => {
  let component: MyShiftComponent;
  let fixture: ComponentFixture<MyShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyShiftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
