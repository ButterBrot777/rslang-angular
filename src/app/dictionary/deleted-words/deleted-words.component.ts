import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { DATA_URL } from 'src/app/shared';
import { playAudio } from 'src/app/shared/utils';
import { FacadeService } from 'src/app/state';

@Component({
  selector: 'app-deleted-words',
  templateUrl: './deleted-words.component.html',
  styleUrls: ['./deleted-words.component.scss'],
})
export class DeletedWordsComponent implements OnInit {
  readonly deletedWords$ = this.stateFacade.deletedWords$;
  readonly isLoading$ = this.stateFacade.isLoading$;

  readonly url = DATA_URL;

	constructor(private stateFacade: FacadeService) {}

  ngOnInit() {
    this.loadDeletedWords();
  }

  loadDeletedWords() {
    this.stateFacade.loadDeletedWords().pipe(first()).subscribe();
  }

  deleteWord(id: string) {
    this.stateFacade.deleteUserWord(id);
    this.loadDeletedWords();
  }

  playAudio(url1: string, url2: string, url3: string) {
    playAudio(this.url, url1, url2, url3);
  }
}
