import { Injectable } from '@angular/core';
import { IUsersWords, IWord } from '../models';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommonFunctionsService {
  url = 'https://dispet.github.io/rslang-data/';

  constructor() {}

  playAudio(url: string): void {
    const audio = new Audio();
    audio.src = this.url + url;
    audio.load();
    audio.play();
    audio.addEventListener('ended', function () {
      if (audio.duration === audio.currentTime) {
        audio.play();
        audio.pause();
        audio.currentTime = 0.0;
      }
    });
  }

  getRandomWords(arr: IWord[], wordsCount: number): IWord[] {
    const result: IWord[] = [];
    let length = arr.length;
    if (wordsCount > length) {
      // для вывода информации в консоль при разработке
      console.error('Заданное количество слов для теста превышает предоставленный набор');
    }
    while (wordsCount) {
      let x = Math.floor(Math.random() * length);
      if (!result.includes(arr[x])) {
        result.push(arr[x]);
        wordsCount--;
      }
    }
    return result;
  }
}
