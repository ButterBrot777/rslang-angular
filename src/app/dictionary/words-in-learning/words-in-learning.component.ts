import { Component, OnDestroy, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FacadeService } from 'src/app/state';

@Component({
  selector: 'app-words-in-learning',
  templateUrl: './words-in-learning.component.html',
  styleUrls: ['./words-in-learning.component.scss'],
})
export class WordsInLearningComponent implements OnInit {
  readonly wordsInLearning$ = this.stateFacade.wordsInLearning$;
  readonly isLoading$ = this.stateFacade.isLoading$;

	constructor(private stateFacade: FacadeService) {}

  ngOnInit() {
    this.loadLearningWords();
  }

  loadLearningWords() {
    this.stateFacade.loadWordsInLearning().pipe(first()).subscribe();
  }
}
