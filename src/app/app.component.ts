import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { AuthService, LocalStorageService, UserService, ApiService } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'rslang';

  constructor(
    private auth: AuthService,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private localStore: LocalStorageService,
    private router: Router,
    private titleService: Title,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    const token = this.localStore.getToken();
    const refreshToken = this.localStore.getRefreshToken();
    const user = this.localStore.getUser();
    const userId = this.localStore.getUserId();

    if (token) {
      this.auth.setToken(token);
    }

    if (refreshToken) {
      this.auth.setRefreshToken(refreshToken);
    }

    if (user) {
      this.userService.setUser(user);
    }

    if (userId) {
      this.apiService.setUserId(userId);
    }

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const child = this.getChild(this.activatedRoute);
      child.data.subscribe((data) => {
        this.titleService.setTitle(data.title);
      });
    });
  }

  getChild(activatedRoute: ActivatedRoute) {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }
}
