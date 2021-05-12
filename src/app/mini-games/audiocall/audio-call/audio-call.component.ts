import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUsersWords, IWord } from '../../../shared/models';
import { ApiService } from '../../../shared/services';
import { ReplaySubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommonFunctionsService } from '../../../shared/services/common-functions.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-audio-call',
  templateUrl: './audio-call.component.html',
  styleUrls: ['./audio-call.component.scss'],
})
export class AudioCallComponent implements OnInit, OnDestroy {
  private groupFromUrl: number;
  private pageFromUrl: number;
  private destroy$: ReplaySubject<any> = new ReplaySubject<any>();
  readonly MAX_VARIANTS_COUNT = 4;
  readonly MAX_WORDS_COUNT = 7;
  answersCounter = 0;
  resultCounter = 0;
  rusVariantsSubArray: string[][];
  rusVariantsArray: string[];
  words: IWord[];
  private answersForStatistic: string[] = [];

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
          this.rusVariantsArray = this.getAllVariantsRu(words);
          this.rusVariantsSubArray = this.getVariantsRu(this.words, this.rusVariantsArray, this.MAX_VARIANTS_COUNT);
        },
        (error) => console.error(error),
      );
  }

  getAllVariantsRu(words: IWord[]) {
    const collectionWords = [];
    for (let i = 0; i < words.length; i++) {
      collectionWords.push(words[i].wordTranslate);
    }
    return collectionWords;
  }

  getVariantsRu(words: IWord[], allVariantsRu: string[], variantsCount: number) {
    let length = allVariantsRu.length;
    let resultArr: Array<string[]> = [];
    for (let i = 0; i < words.length; i++) {
      let result: string[] = [];
      result.push(words[i].wordTranslate);
      let n = variantsCount;
      while (n - 1) {
        let x = Math.floor(Math.random() * length);
        if (!result.includes(allVariantsRu[x])) {
          result.push(allVariantsRu[x]);
          n--;
        }
      }
      result.sort(function () {
        return Math.random() - 0.5;
      });
      resultArr.push(result);
    }
    return resultArr;
  }

  getAnswer(isCorrect: number): void {
    ++this.answersCounter;
    this.resultCounter += isCorrect;
    if (isCorrect) {
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
    this.apiService.updateUserStatisticsByGame('audioCall', arrIds, this.answersForStatistic);
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
