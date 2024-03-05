import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-training-plan',
  templateUrl: './training-plan.component.html',
  styleUrls: ['./training-plan.component.scss']
})
export class TrainingPlanComponent {

  @Input() trainingPlan: any;

  displayTP() {
    console.log("TP from TM component: " + this.trainingPlan);
  }



}
