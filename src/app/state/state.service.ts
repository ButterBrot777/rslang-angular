import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { IPagination, IStatsMiniGamesResponse, IUserSetting, IWord } from "../shared/models";


@Injectable({
  providedIn: 'root',
})
export class StateService {
  private readonly translationDisplaySubject$ = new BehaviorSubject<boolean>(false);
  private readonly controlsDisplaySubject$ = new BehaviorSubject<boolean>(false);
  private readonly listWordsSubject$ = new BehaviorSubject<IWord[]>(null);
  private readonly paginationSubject$ = new BehaviorSubject<IPagination>({
    group: 0,
    page: 0
  });
  private userWordsSubject$ = new BehaviorSubject<Array<any>>(null);
  private wordsInLearningSubject$ = new BehaviorSubject<Array<any>>(null);
  private hardWordsSubject$ = new BehaviorSubject<Array<any>>(null);
  private deletedWordsSubject$ = new BehaviorSubject<Array<any>>(null);
  private userStatisticsSubject$ = new BehaviorSubject<IStatsMiniGamesResponse>(null);

  readonly translationDisplay$ = this.translationDisplaySubject$.asObservable();
  readonly controlsDisplay$ = this.controlsDisplaySubject$.asObservable();

  readonly listWords$ = this.listWordsSubject$.asObservable();
  readonly userWords$ = this.userWordsSubject$.asObservable();
  readonly wordsInLearning$ = this.wordsInLearningSubject$.asObservable();
  readonly hardWords$ = this.hardWordsSubject$.asObservable();
  readonly deletedWords$ = this.deletedWordsSubject$.asObservable();
  readonly pagination$ = this.paginationSubject$.asObservable();
  readonly userStatistics$ = this.userStatisticsSubject$.asObservable();

  readonly MAX_PAGE_COUNT = 29;
  readonly MIN_PAGE_COUNT = 0;

  setTranslationDisplay(isDisplay: string) {
    this.translationDisplaySubject$.next(+isDisplay ? true : false)
  }

  setControlsDisplay(isDisplay: string) {
    this.controlsDisplaySubject$.next(+isDisplay ? true : false)
  }

  setPaginationValues(navigate: any): void {
    this.updatePagination(navigate);
  }

  setUserStatistics(statistics: IStatsMiniGamesResponse) {
    this.userStatisticsSubject$.next(statistics);
  }

  setWords(words: IWord[] | any[], direction: string): void {
    switch (direction) {
      case 'user': this.userWordsSubject$.next(words);
      break;
      case 'list': this.listWordsSubject$.next(words);
      break;
      case 'learning': this.wordsInLearningSubject$.next(words);
      break
      case 'hard': this.hardWordsSubject$.next(words);
      break;
      case 'deleted': this.deletedWordsSubject$.next(words);
      break;
    }
  }

  updatePagination(value: IPagination): void {
    const nextValue = this.paginationSubject$.getValue();
    nextValue.group = value.group ?? nextValue.group;
    nextValue.page = value.page ?? nextValue.page;
    this.paginationSubject$.next(nextValue);
  }
}
