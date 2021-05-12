import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService, IMiniStats } from '../shared';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit, OnDestroy {
  private statisticsSubscription: Subscription;
  public primaryXAxis: Object;
  public chartData: Object[];
  public titleAmount: string;
  public titleIncrease: string;
  public primaryYAxis: Object;
  public primaryZAxis: Object;
  public isStatistics = false;
  public data: IMiniStats[] = [];

  private allLearnedWordsPerDay: number;
  private allLearnedWords: number;
  private allRightWords: number;
  private allWrongWords: number;
  private learnedWordsPerDay: number;
  private learnedWords: number;
  private rightWords: number;
  private wrongWords: number;
  private maxSeries: number;
  private series: number;
  private learnedWordsByIds: Set<string>;
  private allLearnedWordsByIds: Set<string>;

  constructor(private apiService: ApiService) {
    this.titleAmount = 'Количество изученных слов по дням';
    this.titleIncrease = 'Увеличение общего количества изученных слов по дням';
  }

  ngOnInit(): void {
    this.statisticsSubscription = this.apiService.getUserStatistics().subscribe(
      (res) => {
        if (res.optional) {
          const dateNum = this.getDateNum();
          const allWords = [];
          this.allLearnedWordsByIds = new Set();
          this.allLearnedWordsPerDay = 0;
          this.allLearnedWords = 0;
          this.allRightWords = 0;
          this.allWrongWords = 0;
          Object.entries(res.optional).map(([key, value]) => {
            if (key && value.words) {
              allWords.push(...value.words);
              this.learnedWordsByIds = new Set();
              this.learnedWordsPerDay = 0;
              this.learnedWords = 0;
              this.rightWords = 0;
              this.wrongWords = 0;
              this.maxSeries = 0;
              value.words.forEach((item) => {
                if (item.timeStamp === dateNum) {
                  this.learnedWords = this.learnedWordsByIds.size;
                  this.allLearnedWords = this.allLearnedWordsByIds.size;
                  this.learnedWordsByIds = new Set([...this.learnedWordsByIds, ...item.wordsId]);
                  this.allLearnedWordsByIds = new Set([...this.allLearnedWordsByIds, ...item.wordsId]);
                  const learnedWordsInTraining = this.learnedWordsByIds.size - this.learnedWords;
                  const allLearnedWordsInTraining = this.allLearnedWordsByIds.size - this.allLearnedWords;
                  this.learnedWordsPerDay = (this.learnedWordsPerDay || 0) + learnedWordsInTraining;
                  this.allLearnedWordsPerDay = (this.allLearnedWordsPerDay || 0) + allLearnedWordsInTraining;
                  this.series = 0;
                  item.answers.forEach((answer) => {
                    if (answer === 'true') {
                      this.series += 1;
                      this.rightWords += 1;
                      this.allRightWords += 1;
                    } else {
                      this.maxSeries = this.maxSeries > this.series ? this.maxSeries : this.series;
                      this.series = 0;
                      this.wrongWords += 1;
                      this.allWrongWords += 1;
                    }
                  });
                }
              });

              this.data.push({
                nameMiniGame: key,
                learnedWordsPerDay: this.learnedWordsPerDay,
                maxSeries: this.maxSeries,
                rightWords: this.rightWords,
                wrongWords: this.wrongWords,
              });
            }
          });

          this.data.push({
            nameMiniGame: 'Общая',
            learnedWordsPerDay: this.allLearnedWordsPerDay,
            rightWords: this.allRightWords,
            wrongWords: this.allWrongWords,
          });

          const learnedWordsPerDay: { [key: string]: number } = {};
          this.learnedWords = 0;
          this.learnedWordsByIds = new Set();
          allWords.forEach((item) => {
            this.learnedWords = this.learnedWordsByIds.size;
            this.learnedWordsByIds = new Set([...this.learnedWordsByIds, ...item.wordsId]);
            const learnedWordsInTraining = this.learnedWordsByIds.size - this.learnedWords;
            learnedWordsPerDay[item.timeStamp] = (learnedWordsPerDay[item.timeStamp] || 0) + learnedWordsInTraining;
          });

          const dates = Object.keys(learnedWordsPerDay);
          const amountWords = Object.values(learnedWordsPerDay);
          const calculationSum = ((sum: number) => {
            return (value: number) => {
              return (sum += value);
            };
          })(0);
          const increaseWords = amountWords.map(calculationSum);

          this.chartData = [];
          dates.forEach((item, index) =>
            this.chartData.push({
              x: item,
              y: amountWords[index],
              z: increaseWords[index],
            }),
          );

          this.primaryXAxis = {
            interval: 10000,
            title: 'Дата',
          };
          this.primaryYAxis = {
            minimum: 0,
            maximum: Math.max(...amountWords) + 5,
            interval: Math.trunc((Math.max(...amountWords) + 5) / 10),
            title: 'Количество слов',
          };
          this.primaryZAxis = {
            minimum: 0,
            maximum: increaseWords[increaseWords.length - 1] + 10,
            interval: Math.trunc((increaseWords[increaseWords.length - 1] + 10) / 10),
            title: 'Количество слов',
          };
          this.isStatistics = true;
        } else this.isStatistics = false;
      },
      (error) => {
        this.isStatistics = false;
        console.log(error);
      },
    );
  }

  ngOnDestroy() {
    this.statisticsSubscription.unsubscribe();
  }

  getDateNum(): number {
    const date = new Date(Date.now());
    return Number(
      new Date(date.getFullYear(), date.getMonth(), date.getDate())
        .toLocaleString('ru', {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
        })
        .split('.')
        .join(''),
    );
  }
}
