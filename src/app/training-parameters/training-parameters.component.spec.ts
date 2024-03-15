import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingParametersComponent } from './training-parameters.component';

describe('TrainingParametersComponent', () => {
  let component: TrainingParametersComponent;
  let fixture: ComponentFixture<TrainingParametersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingParametersComponent]
    });
    fixture = TestBed.createComponent(TrainingParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
