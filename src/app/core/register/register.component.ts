import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.createForm();
  }

  ngOnInit() {
    console.log('onInit', this.email.errors);
  }

  createForm() {
    this.registerForm = this.fb.group(
      {
        fname: ['', Validators.required],
        lname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: [
          '',
          [
            Validators.required,
            Validators.minLength(9),
            Validators.pattern('[0-9]*')
          ]
        ],
        password: ['', [Validators.required, Validators.minLength(8)]],
        cpassword: ['', [Validators.required, Validators.minLength(8)]]
      },
      { validator: this.checkPasswords }
    );
  }

  tryRegister(formValues) {
    if (this.registerForm.invalid) {
      return;
    }
    this.spinner.show();
    this.authService.signIn(formValues).then(
      res => {
        this.spinner.hide();
        this.router.navigate(['/user']);
        console.log('tryRegister', res);
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.errorMessage = err.message;
      }
    );
  }

  clearErrors() {
    this.errorMessage = '';
  }

  // validator for confirm passwords
  checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.cpassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get cpassword() {
    return this.registerForm.get('cpassword');
  }
  get phone() {
    return this.registerForm.get('phone');
  }
  get fname() {
    return this.registerForm.get('fname');
  }
  get lname() {
    return this.registerForm.get('lname');
  }
}
