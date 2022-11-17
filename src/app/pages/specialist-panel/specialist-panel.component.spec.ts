import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistPanelComponent } from './specialist-panel.component';

describe('SpecialistPanelComponent', () => {
  let component: SpecialistPanelComponent;
  let fixture: ComponentFixture<SpecialistPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialistPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialistPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
