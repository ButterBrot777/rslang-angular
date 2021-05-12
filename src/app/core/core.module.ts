import { NgModule } from '@angular/core';
import { MainLayoutComponent } from './components/main-layout';
import { PageNotFoundComponent } from './components/page-not-found';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [MainLayoutComponent, PageNotFoundComponent],
  exports: [],
  providers: [],
})
export class CoreModule {}
