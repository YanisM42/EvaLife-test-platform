import { Component, Input } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-characterisation-chart',
  templateUrl: './characterisation-chart.component.html',
  styleUrls: ['./characterisation-chart.component.scss']
})
export class CharacterisationChartComponent {
  @Input() a: any;
  @Input() us: any;
  @Input() ls: any;
  @Input() b: any;

  public chart: any;

  ngOnInit(): void {
    // this.createChart();
  }

  displayInfo() {
    console.log("Display42")
    console.log("a: " + this.a);
    console.log("us: " + this.us);
    console.log("ls: " + this.ls);
    console.log("b: " + this.b);
    this.createChart();
  }

  createChart() {
    console.log("chart variable: " + this.chart)
    console.log(document.getElementById('chart-compo'))
    if (this.chart) {
      console.log("destroying chart")
      this.chart.destroy(); // Destroy the existing chart
    }
    this.chart = new Chart("chart-compo", {
      type: 'bar', //this denotes the type of chart
      data: {// values on X-Axis
        labels: ['Aerobic capacity', 'Upper strength', 'Lower Strength','Balance'], 
	      datasets: [
          {
            label: "Physical qualities",
            data: [this.a, this.us, this.ls, this.b],
            backgroundColor: 'orange',
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
