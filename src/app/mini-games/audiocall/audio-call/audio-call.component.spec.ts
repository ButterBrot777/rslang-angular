import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioCallComponent } from './audio-call.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';

describe('AudiocallComponent', () => {
  let component: AudioCallComponent;
  let fixture: ComponentFixture<AudioCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AudioCallComponent],
      imports: [HttpClientTestingModule, RouterModule.forRoot([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
