import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from './localStorage.service';
import { UserService } from './user.service';
import { ApiService } from './api.service';
import { ILoginResponse, IRefreshTokenResponse, IUserCreate, IUserCreateResponse } from '../models';
import { API_URL } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = API_URL;
  private token = '';
  private refreshToken = '';

  isAuthSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private router: Router,
    private apiService: ApiService,
  ) {}

  login(user: IUserCreate): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${this.url}/signin`, user).pipe(
      tap(({ refreshToken, token, userId }) => {
        this.localStorageService.setAuthData({ refreshToken, token, userId });
        this.setToken(token);
        this.setRefreshToken(refreshToken);
        this.apiService.setUserId(userId);
      }),
    );
  }

  register(user: IUserCreate): Observable<IUserCreateResponse> {
    return this.http.post<IUserCreateResponse>(`${this.url}/users`, user);
  }

  updateTokens(): Observable<IRefreshTokenResponse> {
    const userId = this.localStorageService.getUserId();
    return this.http.get<IRefreshTokenResponse>(`${this.url}/users/${userId}/tokens`).pipe(
      tap(({ refreshToken, token }) => {
        this.localStorageService.setAuthData({ refreshToken, token, userId });
        this.setToken(token);
        this.setRefreshToken(refreshToken);
      }),
    );
  }

  isAuthenticated(): boolean {
    return Boolean(this.localStorageService.getToken());
  }

  getAuthStatus(): void {
    const isAuth = this.isAuthenticated();
    isAuth ? this.isAuthSubject.next(true) : this.isAuthSubject.next(false);
  }

  setToken(token): void {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  setRefreshToken(refreshToken): void {
    this.refreshToken = refreshToken;
  }

  getRefreshToken(): string {
    return this.refreshToken;
  }

  logout(): void {
    this.setToken(null);
    this.setRefreshToken(null);
    this.userService.setUser(null);
    this.apiService.setUserId(null);
    this.localStorageService.deleteUser();
    this.localStorageService.clearAuthData();
    this.router.navigate(['/login']);
  }
}
