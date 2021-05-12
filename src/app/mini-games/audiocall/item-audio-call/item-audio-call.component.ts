import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IWord } from '../../../shared/models';
import { CommonFunctionsService } from '../../../shared/services/common-functions.service';

@Component({
  selector: 'app-item-audio-call',
  templateUrl: './item-audio-call.component.html',
  styleUrls: ['./item-audio-call.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemAudioCallComponent {
  isAnswerButtonDisable = false;
  correctAnswer = '';
  isCorrect: number;
  @Input() getVariantsRu: string[];
  @Input() word: IWord;
  @Output() answer = new EventEmitter<number>();

  constructor(private commonFunctions: CommonFunctionsService) {}

  playAudio(url: string): void {
    this.commonFunctions.playAudio(url);
  }

  sendResult(answer: string) {
    this.isCorrect = answer === this.word.wordTranslate ? 1 : 0;
    this.isAnswerButtonDisable = true;
    this.correctAnswer = this.word.wordTranslate;
    this.answer.emit(this.isCorrect);
  }
}
