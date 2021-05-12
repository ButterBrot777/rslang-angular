import { Component, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, Subject } from 'rxjs';
import { first, switchMap, takeUntil } from 'rxjs/operators';
import { SettingsFacade } from '../state/settings-facade.service';
import { FacadeService } from '../state';
import { ActivatedRoute, Router } from '@angular/router';
import { DATA_URL, GAMES_NAME } from '../shared/constants/';
import { playAudio } from '../shared/utils';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.scss'],
})
export class WordsListComponent implements OnInit, OnDestroy {
  constructor(
    private stateFacade: FacadeService,
    private settingsFacade: SettingsFacade,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  isTranslationDisplay$ = this.settingsFacade.isTranslationDisplay$;
  isControlsDisplay$ = this.settingsFacade.isControlsDisplay$;
  listWords$ = this.stateFacade.listWords$;
  userWords$ = this.stateFacade.userWords$;
  pagination$ = this.stateFacade.pagination$;
  userStatistics$ = this.stateFacade.userStatistics$;
  isLoading$ = this.stateFacade.isLoading$;
  url = DATA_URL;
  private destroy$ = new Subject<void>();
  gamesName = GAMES_NAME;
  group: number;
  page: number;

  readonly groupsAmount: Array<number> = [1, 2, 3, 4, 5, 6];

  readonly MAX_GROUP_COUNT = 6;
  readonly MIN_GROUP_COUNT = 1;
  readonly MAX_PAGE_COUNT = 30;
  readonly MIN_PAGE_COUNT = 1;

  ngOnInit(): void {
    this.loadDataFromRoute('list');
    this.loadUserWords();
    this.loadUserSettings();
    this.loadUserStatistics();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  pickGroup(group: number): void {
    this.router.navigate(['words-list', group, 1]);
  }

  isFirstPage(): boolean {
    return +this.page === this.MIN_PAGE_COUNT;
  }

  isLastPage(): boolean {
    return +this.page === this.MAX_PAGE_COUNT;
  }

  nextPage(): void {
    if (!this.isLastPage()) {
      this.router.navigate(['words-list', this.group, +this.page + 1]);
    }
  }

  prevPage(): void {
    if (!this.isFirstPage()) {
      this.router.navigate(['words-list', this.group, +this.page - 1]);
    }
  }

  firstPage(): void {
    this.router.navigate(['words-list', this.group, this.MIN_PAGE_COUNT]);
  }

  lastPage(): void {
    this.router.navigate(['words-list', this.group, this.MAX_PAGE_COUNT]);
  }

  setRouteValuesInWrongCase() {
    this.router.navigate(['words-list', this.MIN_GROUP_COUNT, this.MIN_PAGE_COUNT]);
  }

  convertToNum(value: string) {
    return parseInt(value.trim());
  }

  isCorrectPassedGroupAndPage(group: string, page: string): boolean {
    const isCorrectGroup = !isNaN(this.convertToNum(group)) ? this.checkGroupRange(group) : false;
    const isCorrectPage = !isNaN(this.convertToNum(page)) ? this.checkPageRange(page) : false;
    if (isCorrectGroup && isCorrectPage) return true;
    return false;
  }

  checkGroupRange(group: string): boolean {
    const groupNum = this.convertToNum(group);
    return groupNum >= this.MIN_GROUP_COUNT && groupNum <= this.MAX_GROUP_COUNT;
  }

  checkPageRange(page: string): boolean {
    const pageNum = this.convertToNum(page);
    return pageNum >= this.MIN_PAGE_COUNT && pageNum <= this.MAX_PAGE_COUNT;
  }

  loadDataFromRoute(direction: string) {
    this.route.params
      .pipe(
        switchMap((params) => {
          if (this.isCorrectPassedGroupAndPage(params['group'], params['page'])) {
            this.group = params['group'];
            this.page = params['page'];
            return this.stateFacade.loadListWords(this.group, this.page, direction);
          } else {
            this.setRouteValuesInWrongCase();
            return EMPTY;
          }
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  loadUserWords() {
    this.stateFacade.loadUserWords().pipe(first()).subscribe();
  }

  loadUserSettings() {
    this.settingsFacade.loadUserSettings();
  }

  loadUserStatistics() {
    this.stateFacade.loadUserStatistics().pipe(first()).subscribe();
  }

  addToHard(id: string): void {
    this.stateFacade.addWordToHard(id);
    this.loadUserWords();
  }

  addToDeleted(id: string): void {
    this.stateFacade.addWordToDeleted(id);
    this.loadUserWords();
  }

  playAudio(url1: string, url2: string, url3: string) {
    playAudio(this.url, url1, url2, url3);
  }

  goGame(gameName: string) {
    this.router.navigate(['/mini-games', gameName, this.group, this.page]);
  }
}
