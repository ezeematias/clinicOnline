import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectoButtonComponent } from './selecto-button.component';

describe('SelectoButtonComponent', () => {
  let component: SelectoButtonComponent;
  let fixture: ComponentFixture<SelectoButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectoButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectoButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
