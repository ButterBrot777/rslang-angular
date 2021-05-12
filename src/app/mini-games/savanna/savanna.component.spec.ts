import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavannaComponent } from './savanna.component';

describe('SavannaComponent', () => {
  let component: SavannaComponent;
  let fixture: ComponentFixture<SavannaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavannaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavannaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
