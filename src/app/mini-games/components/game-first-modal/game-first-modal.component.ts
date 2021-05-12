import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Group, Page } from 'src/app/shared/types';
import { IGameInfo, IGameWordDirection } from '../../models/game.model';

@Component({
  selector: 'app-game-first-modal',
  templateUrl: './game-first-modal.component.html',
  styleUrls: ['./game-first-modal.component.scss'],
})
export class GameFirstModalComponent implements OnInit {
  @Output() passGameLevel = new EventEmitter<IGameWordDirection>();
  @Input() info!: IGameInfo;
  difficultyGroups = [1, 2, 3, 4, 5, 6];
  randomPage = Math.floor(Math.random() * 20) as Page;
  wordDirection: IGameWordDirection = { group: 0, page: 0 };
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getWordDirection();
  }

  chooseGameLevel(group: Group) {
    this.wordDirection.group = group;
    this.wordDirection.page = this.randomPage;
    this.passGameLevel.emit(this.wordDirection);
  }

  getWordDirection() {
    this.route.paramMap.pipe(first()).subscribe((params) => {
      this.wordDirection.group = +params.get('group') as Group;
      this.wordDirection.page = +params.get('page') as Page;
      if (this.wordDirection.group && this.wordDirection.page) {
        this.wordDirection.group--;
        this.wordDirection.page--;
        this.passGameLevel.emit(this.wordDirection);
      }
    });
  }
}
