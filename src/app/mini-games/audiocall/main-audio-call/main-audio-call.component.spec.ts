import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAudioCallComponent } from './main-audio-call.component';

describe('MainAudioCallComponent', () => {
  let component: MainAudioCallComponent;
  let fixture: ComponentFixture<MainAudioCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainAudioCallComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainAudioCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
