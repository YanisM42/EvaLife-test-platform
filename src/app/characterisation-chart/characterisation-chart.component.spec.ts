import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterisationChartComponent } from './characterisation-chart.component';

describe('CharacterisationChartComponent', () => {
  let component: CharacterisationChartComponent;
  let fixture: ComponentFixture<CharacterisationChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterisationChartComponent]
    });
    fixture = TestBed.createComponent(CharacterisationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
