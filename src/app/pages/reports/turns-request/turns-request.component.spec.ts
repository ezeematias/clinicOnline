import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnsRequestComponent } from './turns-request.component';

describe('TurnsRequestComponent', () => {
  let component: TurnsRequestComponent;
  let fixture: ComponentFixture<TurnsRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnsRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnsRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
