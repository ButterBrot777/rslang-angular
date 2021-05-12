import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SettingsFacade } from '../state/settings-facade.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  isTranslationDisplay$ = this.settingsFacade.isTranslationDisplay$;
  isControlsDisplay$ = this.settingsFacade.isControlsDisplay$;
  settings$: Observable<any>;

  constructor(private settingsFacade: SettingsFacade, private location: Location) {}

  ngOnInit(): void {
    this.settings$ = combineLatest([this.isTranslationDisplay$, this.isControlsDisplay$]).pipe(
      map(([translation, controls]) => {
        return { translation, controls };
      }),
    );
  }

  changeTranslationDisplay() {
    this.settingsFacade.changeTranslateSetting();
  }

  changeControlsDisplay() {
    this.settingsFacade.changeControlsSetting();
  }

  backToPreviousPage() {
    this.location.back();
  }
}
