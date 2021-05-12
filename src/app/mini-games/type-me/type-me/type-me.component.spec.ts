import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeMeComponent } from './type-me.component';

describe('TypeMeComponent', () => {
  let component: TypeMeComponent;
  let fixture: ComponentFixture<TypeMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TypeMeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
