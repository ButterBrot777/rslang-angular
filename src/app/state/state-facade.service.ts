import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ApiService } from "../shared";
import { Group, Page } from "../shared/types";
import { StateService } from "./state.service";
import { find, first, tap } from 'rxjs/operators';
import { IPagination, IUser, IUsersWords, IWord } from "../shared/models";

@Injectable({
  providedIn: 'root',
})
export class FacadeService {
  constructor(private stateService: StateService, private apiService: ApiService) {}

  readonly pagination$ = this.stateService.pagination$;
  readonly listWords$ = this.stateService.listWords$;
  readonly userWords$ = this.stateService.userWords$;
  readonly wordsInLearning$ = this.stateService.wordsInLearning$;
  readonly hardWords$ = this.stateService.hardWords$;
  readonly deletedWords$ = this.stateService.deletedWords$;
  readonly userStatistics$ = this.stateService.userStatistics$;

  isLoadingSubject$ = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject$.asObservable();

  loadListWords(group: number = 1, page: number = 1, direction: string): Observable<Array<IWord>> {
    const pagination: IPagination = { group: group - 1 as Group, page: page - 1 as Page };
    this.isLoadingSubject$.next(true);
    return this.apiService.getWords(pagination.group, pagination.page).pipe(
      tap({
        next: (data) => {
          this.stateService.setWords(data, direction);
        },
        error: (err) => {
          console.error(JSON.stringify(err));
          alert('не удалось загрузить слова');
        },
        complete: () => {
          this.isLoadingSubject$.next(false);
          this.stateService.updatePagination(pagination);
        },
      }),
    );
  }

  loadUserWords() {
    return this.apiService.getUserWords().pipe(
      tap({
        next: (data) => {
          this.stateService.setWords(data, 'user');
        },
        error: (err) => {
          console.error(JSON.stringify(err));
          alert('не удалось загрузить слова пользователя');
        }
      })
    )
  }

  loadWordsInLearning() {
    this.isLoadingSubject$.next(true);
    return this.apiService.getUserAggregatedWords({ 'userWord.optional.learned': true })
      .pipe(tap({
        next: (data) => {
          this.stateService.setWords(data[0].paginatedResults, 'learning');
          this.isLoadingSubject$.next(false);
        },
        error: (err) => {
          console.error(JSON.stringify(err));
          alert('Не удалось загрузить изучаемые слова');
        }
      }));
  }

  loadHardWords() {
    this.isLoadingSubject$.next(true);
    return this.apiService.getUserAggregatedWords({ 'userWord.difficulty': 'hard', 'userWord.optional.hard': true })
      .pipe(tap({
        next: (data) => {
          this.stateService.setWords(data[0].paginatedResults, 'hard');
          this.isLoadingSubject$.next(false);
        },
        error: (err) => {
          console.error(JSON.stringify(err));
          alert('Не удалось загрузить сложные слова');
        }
      }));
  }

  loadDeletedWords() {
    this.isLoadingSubject$.next(true);
    return this.apiService.getUserAggregatedWords({ 'userWord.difficulty': 'normal', 'userWord.optional.deleted': true })
      .pipe(tap({
        next: (data) => {
          this.stateService.setWords(data[0].paginatedResults, 'deleted');
          this.isLoadingSubject$.next(false);
        },
        error: (err) => {
          console.error(JSON.stringify(err));
          alert('Не удалось загрузить удаленные слова');
        }
      }));
  }

  loadUserStatistics() {
    return this.apiService.getUserStatistics().pipe(
      tap({
        next: (data) => {
          this.stateService.setUserStatistics(data);
        },
        error: (err) => {
          console.error(JSON.stringify(err));
          alert('Не удалось загрузить статистику пользователя');
        }
      })
    )
  }

  addWordWithParams(id: string, body: IUsersWords) {
    this.apiService.createUserWordByWordId(id, body)
      .pipe(first())
      .subscribe(data => data);
  }

  updateWordParams(id: string, body: IUsersWords) {
    this.apiService.updateUserWordByWordId(id, body)
      .pipe(first())
      .subscribe(data => data);
  }

  deleteUserWord(id: string) {
    this.apiService.deleteUserWordByWordId(id)
      .pipe(first())
      .subscribe();
  }

  addWordToHard(id: string): void {
    const body: IUsersWords = {
      difficulty: 'hard',
      optional: {
        hard: true
      }
    };
    let words: IUsersWords[];
    this.userWords$.pipe(
      tap({
        next: (data) => {
          words = data;
        }
      }), first()
    ).subscribe();
    if (words.findIndex(word => word.wordId === id) > -1) {
      this.updateWordParams(id, body);
    } else {
      this.addWordWithParams(id, body);
    }
  }

  addWordToDeleted(id: string): void {
    const body: IUsersWords = {
      difficulty: 'normal',
      optional: {
        deleted: true
      }
    };
    let words: IUsersWords[];
    this.userWords$.pipe(
      tap({
        next: (data) => {
          words = data;
        }
      }), first()
    ).subscribe();
    if (words.findIndex(word => word.wordId === id) > -1) {
      this.updateWordParams(id, body);
    } else {
      this.addWordWithParams(id, body);
    }
  }

  addWordToLearning(id: string) {
    const body: IUsersWords = {
      difficulty: 'normal',
      optional: {
        learned: true
      }
    };
    let words: IUsersWords[];
    this.userWords$.pipe(
      tap({
        next: (data) => {
          words = data;
        }
      }), first()
    ).subscribe();
    if (words.findIndex(word => word.wordId === id) > -1) {
      this.updateWordParams(id, body);
    } else {
      this.addWordWithParams(id, body);
    }
  }
}
