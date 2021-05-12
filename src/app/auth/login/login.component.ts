import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../shared/services';
import { IUserCreate } from '../../shared/models';
import { Subscription } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  submitted = false;
  authSubscription: Subscription;
  message = '';
  hide = true;

  constructor(public auth: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  submit(): void {
    // if (this.form.invalid) {
    //   return;
    // }

    // to disable button 'submit' if form was already submitted
    this.submitted = true;

    // create user, get user data from UI
    const user: IUserCreate = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    // clean form fields and redirect to admin page
    this.auth.login(user).subscribe(
      () => {
        this.form.reset();
        this.submitted = false;
        this.router.navigate(['text-book']);
      },
      (error) => {
        this.submitted = false;
        if (!error.ok) {
          this.message = 'Неверные логин или пароль';
        }
      },
    );
  }
}
