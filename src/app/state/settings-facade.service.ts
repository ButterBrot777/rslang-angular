import { Injectable } from '@angular/core';
import { ApiService, LocalStorageService } from '../shared';
import { IUserSetting } from '../shared/models';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsFacade {
  constructor(private stateService: StateService, private apiService: ApiService, private localStoage: LocalStorageService) {}

  readonly isTranslationDisplay$ = this.stateService.translationDisplay$;
  readonly isControlsDisplay$ = this.stateService.controlsDisplay$;

  loadUserSettings() {
    const translate = this.localStoage.getTranslateSetting();
    if (translate) {
      this.stateService.setTranslationDisplay(translate);
    } else {
      this.localStoage.createTranslateSetting();
      this.stateService.setTranslationDisplay(this.localStoage.getTranslateSetting());
    }

    const controls = this.localStoage.getControlsSetting();
    if (controls) {
      this.stateService.setControlsDisplay(controls);
    } else {
      this.localStoage.createControlsSetting();
      this.stateService.setControlsDisplay(this.localStoage.getControlsSetting());
    }
  }

  changeTranslateSetting() {
    if (+this.localStoage.getTranslateSetting()) {
      this.localStoage.setTranslateDisplay(0);
    } else {
      this.localStoage.setTranslateDisplay(1);
    }
    this.stateService.setTranslationDisplay(this.localStoage.getTranslateSetting());
  }

  changeControlsSetting() {
    if (+this.localStoage.getControlsSetting()) {
      this.localStoage.setControlsSetting(0);
    } else {
      this.localStoage.setControlsSetting(1);
    }
    this.stateService.setControlsDisplay(this.localStoage.getControlsSetting());
  }
}
