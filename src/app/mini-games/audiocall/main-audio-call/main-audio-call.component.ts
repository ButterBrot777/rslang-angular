import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-audio-call',
  templateUrl: './main-audio-call.component.html',
  styleUrls: ['./main-audio-call.component.scss'],
})
export class MainAudioCallComponent implements OnInit {
  readonly groupsAmount: Array<number> = [1, 2, 3, 4, 5, 6];
  constructor() {}

  ngOnInit(): void {}
}
