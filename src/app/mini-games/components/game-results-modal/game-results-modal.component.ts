import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IGameAnswers } from '../../models/game.model';

@Component({
  selector: 'app-game-results-modal',
  templateUrl: './game-results-modal.component.html',
  styleUrls: ['./game-results-modal.component.scss'],
})
export class GameResultsModalComponent implements OnInit {
  @Input() data!: IGameAnswers;
  currentUrl = this.router.url;
  correct: number;
  incorrect: number;
  feedback: string;
  specificParts = '';
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.correct = this.data.correctAnswers.length;
    this.incorrect = this.data.incorrectAnswers.length;

    if (this.correct > 18) {
      this.feedback = 'Отличный результат, не переставайте учиться!';
    } else if (this.correct > 10 && this.correct < 18) {
      this.feedback = 'Хороший результат, больше работай над собой.';
    } else {
      this.feedback = 'Узнайте больше и попробуйте еще раз.';
    }
  }

  playWordAudio(audio: HTMLAudioElement) {
    audio.play();
  }
}
