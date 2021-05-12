import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { IUsersWords, IWord } from '../../../shared/models';
import { ApiService } from '../../../shared/services';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { CommonFunctionsService } from '../../../shared/services/common-functions.service';

@Component({
  selector: 'app-type-me',
  templateUrl: './type-me.component.html',
  styleUrls: ['./type-me.component.scss'],
})
export class TypeMeComponent implements OnInit, OnDestroy {
  private groupFromUrl: number;
  private pageFromUrl: number;
  private destroy$: ReplaySubject<any> = new ReplaySubject<any>();
  private answersForStatistic: string[] = [];
  readonly MAX_WORDS_COUNT = 7;
  answersCounter = 0;
  resultCounter = 0;
  words: IWord[];

  constructor(private apiService: ApiService, private route: ActivatedRoute, private commonFunctions: CommonFunctionsService) {}

  ngOnInit(): void {
    this.loadDataFromRoute();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  loadDataFromRoute() {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.groupFromUrl = +params.get('group');
      this.pageFromUrl = +params.get('page');
      if (this.groupFromUrl && this.pageFromUrl) {
        this.getWords(this.groupFromUrl - 1, this.groupFromUrl - 1);
      } else if (this.groupFromUrl) {
        const pageNumber = Math.floor(Math.random() * 30) - 1;
        this.getWords(this.groupFromUrl - 1, pageNumber);
      } else {
        this.getWords(1, 1);
      }
    });
  }

  getWords(group, page) {
    this.apiService
      .getWords(group, page)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (words) => {
          this.words = this.commonFunctions.getRandomWords(words, this.MAX_WORDS_COUNT);
        },
        (error) => console.error(error),
      );
  }

  getAnswer(isTrue: number): void {
    ++this.answersCounter;
    this.resultCounter += isTrue;
    if (isTrue) {
      this.answersForStatistic.push('true');
    } else {
      this.answersForStatistic.push('false');
    }
  }

  sendDate(): void {
    this.sendStatistic();
    this.sendWordsForStudying();
  }

  sendStatistic() {
    let arrIds: string[] = [];
    this.words.map((word) => arrIds.push(word.id));
    this.apiService.updateUserStatisticsByGame('ownGame', arrIds, this.answersForStatistic);
  }

  sendWordsForStudying() {
    const body: IUsersWords = {
      difficulty: 'normal',
      optional: {
        learned: true,
      },
    };
    this.words.map((word) => this.apiService.createUserWordByWordId(word.id, body).pipe(takeUntil(this.destroy$)).subscribe());
  }
}
