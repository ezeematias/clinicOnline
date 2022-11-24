import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnsDayComponent } from './turns-day.component';

describe('TurnsDayComponent', () => {
  let component: TurnsDayComponent;
  let fixture: ComponentFixture<TurnsDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnsDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnsDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
