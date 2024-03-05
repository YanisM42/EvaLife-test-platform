import { Component, EventEmitter, Output } from '@angular/core';
import { Chart } from 'chart.js/auto';

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

  ngOnInit(): void {
    // this.createChart();
  }

  constructor() {}

  validateInput(): void {
    this.inputIsValid = true;
    for (let physical_quality of [this._aero_capa, this._upper_strength, this._lower_strength, this._balance]) {
      if (isNaN(physical_quality) || typeof physical_quality != 'number') {
        // input is not a number
        this.inputIsValid = false;
      } else {
        // input is a number, check its value
        if (physical_quality < 0 || physical_quality > 1) {
          this.inputIsValid = false;
        }
      }
    }
  }

  set aero_capa(value: number) {
    this._aero_capa = value;
    // this.createChart();
  }

  set upper_strength(value: number) {
    this._upper_strength = value;
    // this.createChart();
  }

  set lower_strength(value: number) {
    this._lower_strength = value;
    // this.createChart();
  }

  set balance(value: number) {
    this._balance = value;
    // this.createChart();
  }

  boundToZeroOne(value: any) {
    if (value < 0) {
      return 0;
    } else if (value > 1) {
      return 1;
    }
    else if (value = null) {
      return 0.1;
    } else {
      return value;
    }
  }

  updateUserCharacterisation() {
    this.validateInput();
    if ( this.inputIsValid ) {
      this.userCharacterisation.emit({a: this._aero_capa, us: this._upper_strength, ls: this._lower_strength, b: this._balance});
    }
  }

  help() {
    console.log("Aerobic capacity: " + this._aero_capa)
    console.log("Upper strength: " + this._upper_strength)
    console.log("Lower strength: " + this._lower_strength)
    console.log("Balance: " + this._balance)
    // this.createChart();
  }

  createChart() {
    console.log("chart variable: " + this.chart)
    console.log(document.getElementById('userProfileChart'))
    if (this.chart) {
      console.log("destroying chart")
      this.chart.destroy(); // Destroy the existing chart
    }
    this.chart = new Chart("userProfileChart", {
      type: 'bar', //this denotes the type of chart
      data: {// values on X-Axis
        labels: ['Aerobic capacity', 'Upper strength', 'Lower Strength','Balance'], 
	      datasets: [
          {
            label: "Physical qualities",
            data: [this._aero_capa, this._upper_strength, this._lower_strength, this._balance],
            backgroundColor: 'blue',
          }
        ]
      },
      options: {
        aspectRatio:4,
        scales: {
          y: {
              display: true,
              beginAtZero: true,   // minimum value will be 0.
              min: 0.0,
              max: 1.0
          }
        }
    }});
  }

}
