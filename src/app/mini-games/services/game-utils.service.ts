import { Injectable } from '@angular/core';
import { IWord } from 'src/app/shared/models';

@Injectable()
export class GameUtilsService {
  constructor() {}

  findAudio(answerWord: string, words: IWord[]) {
    let audioSrc = words.find((word) => {
      return word.wordTranslate === answerWord;
    }).audio;
    return audioSrc;
  }

  findId(answerWord: string, words: IWord[]) {
    let id = words.find((word) => {
      return word.wordTranslate === answerWord;
    }).id;
    return id;
  }
  // we use this function to shuffle options and change words position in words arrray
  shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  removeStyles(button: Element) {
    // button may be undefined at the beginning of the game
    if (button) {
      button.classList.remove('correct');
      button.classList.remove('incorrect');
    }
  }
}
