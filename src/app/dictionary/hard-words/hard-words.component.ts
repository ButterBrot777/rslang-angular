import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { DATA_URL } from 'src/app/shared';
import { playAudio } from 'src/app/shared/utils';
import { FacadeService } from 'src/app/state';

@Component({
	selector: 'app-hard-words',
	templateUrl: './hard-words.component.html',
	styleUrls: ['./hard-words.component.scss'],
})
export class HardWordsComponent implements OnInit {
  readonly hardWords$ = this.stateFacade.hardWords$;
  readonly isLoading$ = this.stateFacade.isLoading$;

  readonly url = DATA_URL;

	constructor(private stateFacade: FacadeService) {}

  ngOnInit() {
    this.loadHardWords();
  }

  loadHardWords() {
    this.stateFacade.loadHardWords().pipe(first()).subscribe();
  }

  deleteWord(id: string) {
    this.stateFacade.deleteUserWord(id);
    this.loadHardWords();
  }

  playAudio(url1: string, url2: string, url3: string) {
    playAudio(this.url, url1, url2, url3);
  }
}
