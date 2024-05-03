import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefineProfileComponent } from './define-profile/define-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';

import { HttpClientModule } from '@angular/common/http';
import { SessionComponent } from './training-plan/session/session.component';
import { TrainingPlanComponent } from './training-plan/training-plan.component';
import { CharacterisationChartComponent } from './characterisation-chart/characterisation-chart.component';

import { NgChartsModule } from 'ng2-charts';
import { ExerciseComponent } from './training-plan/session/exercise/exercise.component';
import { TrainingParametersComponent } from './training-parameters/training-parameters.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    DefineProfileComponent,
    SessionComponent,
    TrainingPlanComponent,
    CharacterisationChartComponent,
    ExerciseComponent,
    TrainingParametersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    MatTabsModule,
    NgChartsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
