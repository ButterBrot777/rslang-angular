import { NgModule } from '@angular/core';
import { WordsInLearningComponent } from './words-in-learning';
import { HardWordsComponent } from './hard-words';
import { DeletedWordsComponent } from './deleted-words';
import { DictionaryComponent } from './dictionary.component';
import { DictionaryRoutingModule } from './dictionary-routing.module';
import { SharedModule } from '../shared';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, SharedModule, DictionaryRoutingModule],
  declarations: [WordsInLearningComponent, HardWordsComponent, DeletedWordsComponent, DictionaryComponent],
  exports: [],
  providers: [],
})
export class DictionaryModule {}
