import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnsFanallyComponent } from './turns-fanally.component';

describe('TurnsFanallyComponent', () => {
  let component: TurnsFanallyComponent;
  let fixture: ComponentFixture<TurnsFanallyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnsFanallyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnsFanallyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
