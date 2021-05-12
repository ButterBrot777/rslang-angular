import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { SharedModule } from '../../shared';
import { RouterModule } from '@angular/router';
import { AuthAgainGuard } from '../../shared/services/authAgain.guard';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent,
        canActivate: [AuthAgainGuard],
      },
    ]),
  ],
  declarations: [LoginComponent],
})
export class LoginModule {}
