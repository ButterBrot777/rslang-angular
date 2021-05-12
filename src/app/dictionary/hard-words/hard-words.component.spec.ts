import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardWordsComponent } from './hard-words.component';

describe('HardWordsComponent', () => {
  let component: HardWordsComponent;
  let fixture: ComponentFixture<HardWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HardWordsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HardWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
