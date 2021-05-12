import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserCreate } from '../../shared/models';
import { MismatchValidator } from './password-mismatch.validator';
import { PasswordFormatValidator } from './password-format.validator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  form: FormGroup;
  submitted = false;
  authSubscription: Subscription;
  hide = true;

  constructor(public auth: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initForm();
    this.setValidators();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  initForm(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null),
      confirmPassword: new FormControl(null),
    });
  }

  // if create validators inside form initializing they can't see the form
  setValidators(): void {
    // validator for password confirmation
    const formValidators = {
      confirmPassword: Validators.compose([Validators.required, MismatchValidator.mismatch(this.form.get('password'))]),
    };

    // validator for passing password to the special requirement (see PasswordFormatValidator)
    const passwordFormatValidators = {
      password: Validators.compose([Validators.required, Validators.minLength(8), PasswordFormatValidator.passFormat()]),
    };

    this.form.get('confirmPassword').setValidators(formValidators['confirmPassword']);
    this.form.get('password').setValidators(passwordFormatValidators['password']);
  }

  submit(): void {
    // to disable button 'submit' if form was already submitted
    this.submitted = true;

    // create user, get user data from UI
    const user: IUserCreate = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    // clean form fields and redirect to admin page
    this.authSubscription = this.auth.register(user).subscribe(
      () => {
        this.form.reset();
        this.submitted = false;
        this.router.navigate(['login']);
      },
      () => (this.submitted = false),
    );
  }
}
