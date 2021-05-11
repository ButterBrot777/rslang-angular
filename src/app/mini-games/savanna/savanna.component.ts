import { Component } from '@angular/core';
import { IGameAnswer, IGameAnswers, IGameInfo, IGameWordDirection } from '../models/game.model';
import { flyTopDown } from '../animations/savanna-animations';
import { ApiService } from 'src/app/shared';
import { IStatsMiniGamesResponse, IUsersWords, IWord } from 'src/app/shared/models';
import { Group, Page, Training } from 'src/app/shared/types';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-savanna',
  templateUrl: './savanna.component.html',
  styleUrls: ['./savanna.component.scss'],
  animations: [flyTopDown],
})
export class SavannaComponent {
  displayFirstModal = true;
  displayResultsModal = false;
  words$!: Observable<IWord[]>;
  isGameOver = false;
  heartsCount = Array(5).fill('h');
  newWords: Training;
  game: IGameAnswers = {
    correctAnswers: [],
    incorrectAnswers: [],
    correctAnswersTranslate: [],
    incorrectAnswersTranslate: [],
    correctAnswerAudios: [],
    incorrectAnswerAudios: [],
    correctAnswersId: [],
    incorrectAnswersId: [],
  };
  savannaWrapperHeight = { height: '100%' };
  private bgpY = '100%';
  backgroundPositionY = { 'background-position-y': this.bgpY };
  gameInfo: IGameInfo = {
    name: 'Саванна',
    nameForBackend: 'savannah',
    info: 'Вы можете выбрать ответ с помощью цифр 1, 2, 3 или 4 на клавиатуре или с помощью мыши.',
  };
  constructor(private apiService: ApiService) {}

  beginTheGame(wordDirection: IGameWordDirection) {
    this.getChoosenGroupWords(wordDirection.group, wordDirection.page);
    setTimeout(() => {
      this.displayFirstModal = false;
    }, 0);
  }

  recieveAnswer(answerObject: IGameAnswer) {
    if (answerObject.isCorrect === false) {
      this.decreaseHeart();
      this.game.incorrectAnswers.push(answerObject.answer.answer);
      this.game.incorrectAnswersTranslate.push(answerObject.answer.answerTranslate);
      this.game.incorrectAnswerAudios.push(answerObject.audio);
      this.game.incorrectAnswersId.push(answerObject.id);
    } else {
      this.game.correctAnswers.push(answerObject.answer.answer);
      this.game.correctAnswersTranslate.push(answerObject.answer.answerTranslate);
      this.game.correctAnswerAudios.push(answerObject.audio);
      this.game.correctAnswersId.push(answerObject.id);
    }
    this.bgpY = `${+this.bgpY.replace(/\%/g, '') - 5}%`;
    this.backgroundPositionY = { 'background-position-y': this.bgpY };
  }

  closeResultsModal() {
    this.savannaWrapperHeight = { height: '100%' };
    this.displayFirstModal = false;
  }

  endGame() {
    this.isGameOver = true;
    this.openResultsModal();
    const corrects = Array(this.game.correctAnswers.length).fill('true');
    const incorrects = Array(this.game.incorrectAnswers.length).fill('false');
    const wordsId = [...this.game.correctAnswersId, ...this.game.incorrectAnswersId];
    const answers = [...corrects, ...incorrects];
    this.apiService.updateUserStatisticsByGame('savannah', wordsId, answers);
  }

  createUserWordByWordId() {
    const body: IUsersWords = {
      difficulty: 'normal',
      optional: {
        learned: true,
      },
    };
    for (let i = 0; i < this.newWords.wordsId.length; i++) {
      const ID = this.newWords.wordsId[i];
      this.apiService.createUserWordByWordId(ID, body).subscribe((_) => {
        return this.apiService.updateUserWordByWordId(ID, body).subscribe((data) => data);
      });
    }
  }

  private getChoosenGroupWords(level: Group, page: Page) {
    this.words$ = this.apiService.getWords(level, page);
  }

  private openResultsModal() {
    this.displayResultsModal = true;
    this.savannaWrapperHeight = { height: '0%' };
  }

  private decreaseHeart() {
    this.heartsCount.pop();
    if (this.heartsCount.length === 0) {
      this.endGame();
    }
  }
}
