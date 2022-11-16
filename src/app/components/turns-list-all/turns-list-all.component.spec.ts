import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnsListAllComponent } from './turns-list-all.component';

describe('TurnsListAllComponent', () => {
  let component: TurnsListAllComponent;
  let fixture: ComponentFixture<TurnsListAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnsListAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnsListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
