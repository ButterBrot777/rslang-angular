import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTypeMeComponent } from './main-type-me.component';

describe('MainTypeMeComponent', () => {
  let component: MainTypeMeComponent;
  let fixture: ComponentFixture<MainTypeMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainTypeMeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainTypeMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
