import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { WordsListComponent } from './words-list.component';
import { WordsListRoutingModule } from './words-list-routing.module';
import { SettingsComponent } from '../settings';

@NgModule({
  declarations: [WordsListComponent, SettingsComponent],
  imports: [CommonModule, SharedModule, WordsListRoutingModule],
})
export class WordsListModule {}
