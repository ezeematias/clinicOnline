import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientListComponent } from './pacient-list.component';

describe('PacientListComponent', () => {
  let component: PacientListComponent;
  let fixture: ComponentFixture<PacientListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacientListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
