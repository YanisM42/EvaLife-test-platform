import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-training-parameters',
  templateUrl: './training-parameters.component.html',
  styleUrls: ['./training-parameters.component.scss']
})
export class TrainingParametersComponent {

  _nbWeeks: number = 5;
  @Output() trainingPlanParams = new EventEmitter<{nbWeeks: number}>();
  
  inputIsValid: boolean = true;

  set nbWeeks(value: number) {
    this._nbWeeks = value;
  }

  validateInput(): void {
    this.inputIsValid = true;
    if (isNaN(this._nbWeeks) || typeof this._nbWeeks != 'number') {
      // input is not a number
      this.inputIsValid = false;
    } else {
      if (!Number.isInteger(this._nbWeeks)) {
        this.inputIsValid = false;
      } else {
        if (this._nbWeeks <=0) {
          this.inputIsValid = false;
        }
      }
    }
  }

  updateParamsChild() {
    this.validateInput();
    if (this.inputIsValid) {
      this.trainingPlanParams.emit({nbWeeks: this._nbWeeks});
    }
    return this.inputIsValid;
  }

}
