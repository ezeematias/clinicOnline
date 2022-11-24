import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnsSpecialtyComponent } from './turns-specialty.component';

describe('TurnsSpecialtyComponent', () => {
  let component: TurnsSpecialtyComponent;
  let fixture: ComponentFixture<TurnsSpecialtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnsSpecialtyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnsSpecialtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
