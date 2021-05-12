import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent, HeaderComponent } from './components';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, RouterModule, HttpClientModule],
  declarations: [HeaderComponent, FooterComponent],
  exports: [CommonModule, RouterModule, HeaderComponent, FormsModule, ReactiveFormsModule, MaterialModule, FooterComponent],
  providers: [],
})
export class SharedModule {}
