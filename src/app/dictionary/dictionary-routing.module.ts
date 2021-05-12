import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeletedWordsComponent } from './deleted-words';
import { DictionaryComponent } from './dictionary.component';
import { HardWordsComponent } from './hard-words';
import { WordsInLearningComponent } from './words-in-learning';

const routes: Routes = [
  {path: '', component: DictionaryComponent,
  children: [
    {path: 'hard-words', component: HardWordsComponent},
    {path: 'deleted-words', component: DeletedWordsComponent},
    {path: 'words-in-learning', component: WordsInLearningComponent},
    {path: '', redirectTo: 'words-in-learning', pathMatch: 'full'}
  ],
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [],
  exports: [RouterModule],
  providers: [],
})
export class DictionaryRoutingModule {}
