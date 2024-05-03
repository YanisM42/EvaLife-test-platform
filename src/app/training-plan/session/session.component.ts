import { Component, Input } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent {

  @Input() session: any;
  public sessionChart: any;
  pathToAssets: string = environment.pathToAssets;

  ngOnInit(): void {
    this.formatCharacterisation();
  }

  constructor() {}

  ngAfterViewInit(): void {
  }  

  formatCharacterisation(): void {
    if (this.session && this.session.characterisation) {
      this.session.characterisation = this.session.characterisation.map((value: number) =>
        value.toFixed(2) // Use toFixed(3) for three decimals
      );
    }
  }

}
