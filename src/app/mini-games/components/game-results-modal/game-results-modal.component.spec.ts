import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameResultsModalComponent } from './game-results-modal.component';

describe('GameResultsModalComponent', () => {
  let component: GameResultsModalComponent;
  let fixture: ComponentFixture<GameResultsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameResultsModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameResultsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
