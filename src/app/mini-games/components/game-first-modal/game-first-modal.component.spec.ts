import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameFirstModalComponent } from './game-first-modal.component';

describe('GameFirstModalComponent', () => {
  let component: GameFirstModalComponent;
  let fixture: ComponentFixture<GameFirstModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameFirstModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameFirstModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
