import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-define-profile',
  templateUrl: './define-profile.component.html',
  styleUrls: ['./define-profile.component.scss'],
})
export class DefineProfileComponent {
  _aero_capa: number = 0.1;
  _upper_strength: number = 0.1;
  _lower_strength: number = 0.1;
  _balance: number = 0.1;

  inputIsValid: boolean = true;
  public chart: any;
  @Output() userCharacterisation = new EventEmitter<{a: number, us: number, ls: number, b: number}>();

  constructor() {}

  validateInput(): void {
    this.inputIsValid = true;
    for (let physical_quality of [this._aero_capa, this._upper_strength, this._lower_strength, this._balance]) {
      if (isNaN(physical_quality) || typeof physical_quality != 'number') {
        // input is not a number
        this.inputIsValid = false;
      } else {
        // input is a number, check its value
        if (physical_quality <= 0 || physical_quality >= 1) {
          this.inputIsValid = false;
        }
      }
    }
  }

  set aero_capa(value: number) {
    this._aero_capa = value;
  }

  set upper_strength(value: number) {
    this._upper_strength = value;
  }

  set lower_strength(value: number) {
    this._lower_strength = value;
  }

  set balance(value: number) {
    this._balance = value;
  }

  updateCharacterisationChild() {
    this.validateInput();
    if ( this.inputIsValid ) {
      this.userCharacterisation.emit({a: this._aero_capa, us: this._upper_strength, ls: this._lower_strength, b: this._balance});
    }
    return this.inputIsValid;
  }

}
