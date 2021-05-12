import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration.component';
import { AuthAgainGuard } from '../../shared/services/authAgain.guard';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: RegistrationComponent,
        canActivate: [AuthAgainGuard],
      },
    ]),
  ],
})
export class RegistrationModule {}
