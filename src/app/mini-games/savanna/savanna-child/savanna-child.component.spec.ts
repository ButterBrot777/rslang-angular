import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavannaChildComponent } from './savanna-child.component';

describe('SavannaChildComponent', () => {
  let component: SavannaChildComponent;
  let fixture: ComponentFixture<SavannaChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavannaChildComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavannaChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
