import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.createForm();
    console.log(this.email.errors);
  }

  clearErrors() {
    this.errorMessage = '';
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  tryLogin(value) {
    console.log(this);
    this.spinner.show();

    if (this.loginForm.invalid) {
      return;
    }

    this.authService.doLogin(value).then(
      res => {
        this.spinner.hide();

        // TODO: solve the issue
        this.router.navigate(['/user']);
        console.log('tryLogin', res);
      },
      err => {
        this.spinner.hide();
        console.log('loginError', err);
        this.errorMessage = err.message;
      }
    );
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
