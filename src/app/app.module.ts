import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core';

import { SharedModule, TokenInterceptor } from './shared';
import { LoginModule } from './auth/login/login.module';
import { RegistrationModule } from './auth/registration/registration.module';
import { StatisticsModule } from './statistics/statistics.module';

import { AppComponent } from './app.component';
import { ElectronicTextbookComponent } from './electronic-textbook';
import { RegistrationComponent } from './auth';
import { HomePageComponent } from './home-page';
import { AboutUsComponent } from './about-us/about-us.component';

@NgModule({
  declarations: [AppComponent, ElectronicTextbookComponent, RegistrationComponent, HomePageComponent, AboutUsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    LoginModule,
    RegistrationModule,
    SharedModule,
    CoreModule,
    StatisticsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, multi: true, useClass: TokenInterceptor }],
  bootstrap: [AppComponent],
})
export class AppModule {}
