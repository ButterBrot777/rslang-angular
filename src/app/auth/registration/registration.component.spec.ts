import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let debugElem: DebugElement;
  let htmlElem: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    debugElem = fixture.debugElement.query(By.css('form'));
    htmlElem = debugElem.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // test 5
  it(
    'password should be the same',
    waitForAsync(() => {
      const password = 'blablaPass1#';
      const pass = component.form.controls['password'].setValue(password);
      const confirm = component.form.controls['confirmPassword'].setValue(password);
      expect(pass).toEqual(confirm);
    }),
  );
});
