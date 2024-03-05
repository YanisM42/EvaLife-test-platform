import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineProfileComponent } from './define-profile.component';

describe('DefineProfileComponent', () => {
  let component: DefineProfileComponent;
  let fixture: ComponentFixture<DefineProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefineProfileComponent]
    });
    fixture = TestBed.createComponent(DefineProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
