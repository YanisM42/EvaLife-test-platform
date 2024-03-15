import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DefineProfileComponent } from './define-profile/define-profile.component';
import { TrainingParametersComponent } from './training-parameters/training-parameters.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  testStringParent: string = '';
  trainingPlanVisible: boolean = false;
  
  // User characterisation:
  aero_capa: number = 0.1;
  upper_strength: number = 0.1;
  lower_strength: number = 0.1;
  balance: number = 0.1;

  // Training plan parameters:
  nbWeeks: number = 5;

  trainingPlan: any;

  @ViewChild(DefineProfileComponent) defineProfileComp!: DefineProfileComponent;
  @ViewChild(TrainingParametersComponent) trainingPlanParamsComponent!: TrainingParametersComponent;

  constructor(
    private http: HttpClient
  ){}

  updateCharacterisationParent(characterisation: {a: number, us: number, ls: number, b: number}) {
    this.aero_capa = characterisation['a'];
    this.upper_strength = characterisation['us'];
    this.lower_strength = characterisation['ls'];
    this.balance = characterisation['b'];
    console.log("1- End of updateCharacParent()")
    // this.getTrainingPlan();
    // this.trainingPlanVisible = true;
  }

  updateParamsParent(trainingPlanParams: {nbWeeks: number}) {
    this.nbWeeks = trainingPlanParams.nbWeeks;
    console.log("2- End of updateParamsParent()")
  }

  getObjectInfo(obj: any) {
    var count = 0;
    for (var elem in obj) {
      console.log(elem);
      count++;
    }
    return count;
  }

  getTrainingPlan() {
    this.http.get<any[]>('http://127.0.0.1:3000/test', {params: {
      aero_capa: this.aero_capa,
      upper_strength: this.upper_strength,
      lower_strength: this.lower_strength,
      balance: this.balance,
      iterations: this.nbWeeks
    }}).subscribe(resData => {
      this.trainingPlan = resData;
    })
  }

  collectData() {
    // Collect user characterisation and training plan parameters
    console.log("0- collectData() called")
    const validProfile = this.defineProfileComp.updateCharacterisationChild();
    const validParams = this.trainingPlanParamsComponent.updateParamsChild();
    console.log("Valid params: " + validParams);
    if (validProfile && validParams) {
      this.getTrainingPlan();
      this.trainingPlanVisible = true;
    } else {
      console.log("Do nothing")
    }
  }

}
