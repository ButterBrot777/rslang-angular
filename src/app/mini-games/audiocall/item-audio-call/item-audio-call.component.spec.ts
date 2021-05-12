import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAudioCallComponent } from './item-audio-call.component';

describe('ItemAudioCallComponent', () => {
  let component: ItemAudioCallComponent;
  let fixture: ComponentFixture<ItemAudioCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemAudioCallComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemAudioCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
