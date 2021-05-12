import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-type-me',
  templateUrl: './main-type-me.component.html',
  styleUrls: ['./main-type-me.component.scss'],
})
export class MainTypeMeComponent implements OnInit {
  readonly groupsAmount: Array<number> = [1, 2, 3, 4, 5, 6];
  constructor() {}

  ngOnInit(): void {}
}
