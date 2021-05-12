import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let debugElem: DebugElement;
  let htmlElem: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    debugElem = fixture.debugElement.query(By.css('form'));
    htmlElem = debugElem.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // test 1
  it(
    'should set submitted to true by submit form',
    waitForAsync(() => {
      component.submit();
      expect(component.submitted).toBeTruthy();
    }),
  );

  // test 2
  it(
    'should call submit method by submit form',
    waitForAsync(() => {
      spyOn(component, 'submit');
      htmlElem = fixture.debugElement.query(By.css('button')).nativeElement;
      htmlElem.click();
      expect(component.submit).toHaveBeenCalledTimes(0);
    }),
  );

  // test 3
  it(
    'form should to be invalid',
    waitForAsync(() => {
      component.form.controls['email'].setValue('');
      component.form.controls['password'].setValue('');
      expect(component.form.valid).toBeFalsy();
    }),
  );

  // test 4
  it(
    'form should to be valid',
    waitForAsync(() => {
      component.form.controls['email'].setValue('test@test.com');
      component.form.controls['password'].setValue('blablabla');
      expect(component.form.valid).toBeTruthy();
    }),
  );
});
