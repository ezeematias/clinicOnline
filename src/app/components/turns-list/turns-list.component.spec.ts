import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnsListComponent } from './turns-list.component';

describe('TurnsListComponent', () => {
  let component: TurnsListComponent;
  let fixture: ComponentFixture<TurnsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
