import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService, LocalStorageService, UserService, ApiService } from '../services';
import { ITokenPayload } from '../models';
import { Errors } from '../constants';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private apiService: ApiService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {
      const userId = this.localStorageService.getUserId();
      if (req.url.includes(`/users/${userId}/tokens`)) {
        req = this.addToken(req, this.auth.getRefreshToken());
      } else {
        req = this.addToken(req, this.auth.getToken());
      }
      const token: string = this.auth.getToken();
      try {
        const tokenPayload: ITokenPayload = JSON.parse(atob(token.match(/\..+\./)[0].slice(1, -1)));
        const tokenExpDate: number = tokenPayload.exp;
        const minutesLeft: number = (tokenExpDate - Date.now() / 1000) / 60;
        if (minutesLeft < 120 && !this.isRefreshing) {
          this.isRefreshing = true;
          return this.auth.updateTokens().pipe(
            switchMap(() => {
              this.isRefreshing = false;
              return next.handle(req).pipe(catchError((err: HttpErrorResponse) => this.handleAuthError(err)));
            }),
          );
        }
      } catch {}
    }

    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => this.handleAuthError(err)));
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handleAuthError(err: HttpErrorResponse): Observable<never> {
    if (err.status === Errors.FORBIDDEN || err.status === Errors.TOKEN_EXPIRED) {
      this.auth.setToken(null);
      this.auth.setRefreshToken(null);
      this.apiService.setUserId(null);
      this.localStorageService.clearAuthData();
      this.userService.setUser(null);
      this.localStorageService.deleteUser();
      const queryParam = err.status === Errors.TOKEN_EXPIRED ? 'sessionFailed' : 'accessDenied';
      const queryParams = {};
      queryParams[queryParam] = true;
      this.router.navigate(['/login'], {
        queryParams,
      });
    }
    return throwError(err);
  }
}
