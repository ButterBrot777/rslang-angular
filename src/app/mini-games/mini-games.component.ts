import { Component } from '@angular/core';
import { GAMES_NAME } from '../shared/constants';

@Component({
  selector: 'app-mini-games',
  templateUrl: './mini-games.component.html',
  styleUrls: ['./mini-games.component.scss'],
})
export class MiniGamesComponent {
  readonly gameNames = GAMES_NAME;
  constructor() {}
}
