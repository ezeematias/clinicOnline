import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnsListAssignedComponent } from './turns-list-assigned.component';

describe('TurnsListAssignedComponent', () => {
  let component: TurnsListAssignedComponent;
  let fixture: ComponentFixture<TurnsListAssignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnsListAssignedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnsListAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
