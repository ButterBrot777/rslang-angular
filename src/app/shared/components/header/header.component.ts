import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService, LocalStorageService } from '../../services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authSubscription: Subscription;

  isLogin = false;

  constructor(private authService: AuthService, private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    const isAuth = Boolean(this.localStorageService.getToken());
    this.authSubscription = this.authService.isAuthSubject.subscribe((userStatus) => {
      this.isLogin = userStatus || isAuth;
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  logout(): void {
    this.authService.isAuthSubject.next(false);
    this.authService.logout();
  }
}
