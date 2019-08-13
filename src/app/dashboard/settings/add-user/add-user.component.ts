import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService, User } from 'src/app/core/auth.service';
import { Router } from '@angular/router';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string;
  success: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private usersService: UsersService,
  ) {
    this.createForm();
  }

  ngOnInit() { }

  tryRegister(formValues) {
    this.registerForm.disable();
    this.clearErrors();
    if (this.registerForm.invalid) {
      return;
    }
    this.usersService.createUser(formValues).then(
      res => {
        this.registerForm.reset();
        this.success = true;
        setTimeout(() => {
          this.success = false;
        }, 5000);
      },
      err => {
        this.errorMessage = err.message;
      }
    ).finally(() => {
      this.registerForm.enable();
    });
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
  get companyID() {
    return this.registerForm.get('companyID');
  }
}
