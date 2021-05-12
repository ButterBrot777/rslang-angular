import {Injectable} from '@angular/core';
import {IAuthData, IUser} from '../models';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setAuthData(data: IAuthData): void {
    localStorage.setItem('token', data.token);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('userId', data.userId);
  }

  clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
  }

  setUser(user): void {
    localStorage.setItem('name', user.name);
    localStorage.setItem('email', user.email);
  }

  getUser(): IUser {
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');

    if (name && email) {
      return {name, email};
    }

    return null;
  }

  deleteUser(): void {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getRefreshToken(): string {
    return localStorage.getItem('refreshToken');
  }

  getUserId(): string {
    return localStorage.getItem('userId');
  }

  getTranslateSetting() {
    return localStorage.getItem('RSLangIsTranslateDisplay');
  }

  getControlsSetting() {
    return localStorage.getItem('RSLangIsControlsDisplay');
  }

  createTranslateSetting() {
    localStorage.setItem('RSLangIsTranslateDisplay', '1');
  }

  createControlsSetting() {
    localStorage.setItem('RSLangIsControlsDisplay', '1');
  }

  setTranslateDisplay(isDisplay: number) {
    localStorage.setItem('RSLangIsTranslateDisplay', `${isDisplay}`);
  }

  setControlsSetting(isDisplay: number) {
    localStorage.setItem('RSLangIsControlsDisplay', `${isDisplay}`);
  }
}
