import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EvaLife-test-platform';
  testStringParent: string = '';
  trainingPlanVisible: boolean = false;
  aero_capa: number = 0.1;
  upper_strength: number = 0.1;
  lower_strength: number = 0.1;
  balance: number = 0.1;
  trainingPlan: any;

  constructor(
    private http: HttpClient
  ){}

  updateUserCharacterisationHandler(characterisation: {a: number, us: number, ls: number, b: number}) {
    console.log("Aerobic capacity: " + characterisation['a']);
    console.log("Upper S: " + characterisation['us']);
    console.log("Lower S: " + characterisation['ls']);
    console.log("Balance: " + characterisation['b']);
    this.aero_capa = characterisation['a'];
    this.upper_strength = characterisation['us'];
    this.lower_strength = characterisation['ls'];
    this.balance = characterisation['b'];
    this.getTrainingPlan();
    this.trainingPlanVisible = true;
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
    console.log("Get training plan")
    this.http.get<any[]>('http://127.0.0.1:3000/test', {params: {
      aero_capa: this.aero_capa,
      upper_strength: this.upper_strength,
      lower_strength: this.lower_strength,
      balance: this.balance,
    }}).subscribe(resData => {
      console.log("Training plan: "+ resData);
      console.log("Training plan type: " + typeof resData);
      this.trainingPlan = resData;
      console.log("Size: " + this.getObjectInfo(resData[0]));

      // this.selectedPatientName = resData[0]['Prénom'] + ' ' + resData[0]['Nom'] ;
    })
  }

}
