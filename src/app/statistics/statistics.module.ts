import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { SharedModule } from '../shared';
import { StatisticsComponent } from './statistics.component';

@NgModule({
  declarations: [StatisticsComponent],
  imports: [
    SharedModule,
    ChartAllModule,
    RouterModule.forChild([
      {
        path: '',
        component: StatisticsComponent,
      },
    ]),
  ],
})
export class StatisticsModule {}
