import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsInLearningComponent } from './words-in-learning.component';

describe('WordsInLearningComponent', () => {
  let component: WordsInLearningComponent;
  let fixture: ComponentFixture<WordsInLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WordsInLearningComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordsInLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
