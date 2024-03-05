import { Component, Input } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent {

  @Input() session: any;
  public sessionChart: any;

  ngOnInit(): void {
    console.log("SessionComponent being rendered")
    this.formatCharacterisation();
    // this.createSessionChart();
  }

  constructor() {}

  ngAfterViewInit(): void {
    console.log("Refffffff")
    console.log(document.getElementById('sessionChart'));
    // this.createSessionChart();
  }

  help() {
    console.log(document.getElementById('sessionChart'));
    this.createSessionChart();
  }

  createSessionChart() {
    if (this.sessionChart) {
      console.log("Destroying existing chart")
      this.sessionChart.destroy(); // Destroy the existing chart
    }
    this.sessionChart = new Chart('sessionChart', {
      type: 'bar', //this denotes the type of chart
      data: {// values on X-Axis
        labels: ['Aerobic capacity', 'Upper strength', 'Lower Strength','Balance'], 
	      datasets: [
          {
            label: "Physical qualities",
            data: this.session.characterisation,
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
              max:1.0
          }
        }
    }});
  }

  formatCharacterisation(): void {
    if (this.session && this.session.characterisation) {
      this.session.characterisation = this.session.characterisation.map((value: number) =>
        value.toFixed(2) // Use toFixed(3) for three decimals
      );
    }
  }

}
