import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {IUserCreate} from "../../shared/models";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  message: string;

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // if you are not logged in and try to go to dashboard,
    // you get in url query param loginAgain=true.
    // Then get this url like observable and check this queryParam
    this.route.queryParams.subscribe((params: Params) => {
      if (params.loginAgain) {
        this.message = 'Please, login';
      } else if (params.authFailed) {
        this.message = 'Session is expired. Please login again'
      }
    });

    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    // to disable button 'submit' if form was already submitted
    this.submitted = true;

    // create user, get user data from UI
    const user: IUserCreate = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    // clean form fields and redirect to admin page
    this.auth.login(user).subscribe(() => {
        this.form.reset();
        this.router.navigate(['/admin', 'dashboard']);
        this.submitted = false;
      },
      () => this.submitted = false);
  }
}
