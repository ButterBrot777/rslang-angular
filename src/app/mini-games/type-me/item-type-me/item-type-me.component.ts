import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IWord } from '../../../shared/models';
import { CommonFunctionsService } from '../../../shared/services/common-functions.service';

@Component({
  selector: 'app-item-type-me',
  templateUrl: './item-type-me.component.html',
  styleUrls: ['./item-type-me.component.scss'],
})
export class ItemTypeMeComponent {
  url = 'https://dispet.github.io/rslang-data/';
  isAnswerButtonDisable = false;
  correctAnswer = '';
  isCorrect: number;
  @Input() word: IWord;
  @Output() answer = new EventEmitter<number>();

  constructor(private commonFunctions: CommonFunctionsService) {}

  playAudio(url: string): void {
    this.commonFunctions.playAudio(url);
  }

  sendResult(answer: string) {
    this.isCorrect = answer.toLowerCase().trim() === this.word.word ? 1 : 0;
    this.isAnswerButtonDisable = true;
    this.correctAnswer = this.word.word;
    this.answer.emit(this.isCorrect);
  }
}
