import { Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

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
  @Input() chartColour: any;
  @Input() chartTitle: any;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0.0,
        max: 1.0
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      // datalabels: {
      //   anchor: 'end',
      //   align: 'end',
      // },
    },
  };
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: ['Aerobic capacity', 'Upper strength', 'Lower Strength','Balance'],
    datasets: [
      {
        data: [0.0, 0.0, 0.0, 0.0],
        label: 'Profile',
        backgroundColor: 'green',
      },
    ],
  };

  ngOnInit(): void {
    this.barChartData.datasets[0].data = [this.a, this.us, this.ls, this.b];
    this.barChartData.datasets[0].backgroundColor = this.chartColour;
    this.barChartData.datasets[0].label = this.chartTitle;
  }

  ngOnChanges() {
    this.barChartData.datasets[0].data = [this.a, this.us, this.ls, this.b];
    if (this.chart) {
      this.chart.update();
    }
  }

}
