import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../core/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  	) { 
    this.createForm();
  }

  ngOnInit() {
  }
  createForm() {
    this.registerForm = this.fb.group(
      {
        fname: ["", Validators.required],
        lname: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        companyID: ["", Validators.required],
        phone: [
          "",
          [
            Validators.required,
            Validators.minLength(9),
            Validators.pattern("[0-9]*")
          ]
        ],
        password: ["", [Validators.required, Validators.minLength(8)]],
        cpassword: ["", [Validators.required, Validators.minLength(8)]]
      },
      { validator: this.checkPasswords }
    );
  }


  tryRegister(formValues) {
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.signInUser(formValues).then(
      res => {
        this.router.navigate(["/user"]);
        console.log("tryRegister", res);
      },
      err => {
        console.log(err);
        this.errorMessage = err.message;
      }
    );
  }

  clearErrors() {
    this.errorMessage = "";
  }
  // validator for confirm passwords
  checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.cpassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  get email() {
    return this.registerForm.get("email");
  }
  get password() {
    return this.registerForm.get("password");
  }
  get cpassword() {
    return this.registerForm.get("cpassword");
  }
  get phone() {
    return this.registerForm.get("phone");
  }
  get fname() {
    return this.registerForm.get("fname");
  }
  get lname() {
    return this.registerForm.get("lname");
  }
  get companyID() {
    return this.registerForm.get("companyID");
  }
}
