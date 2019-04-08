import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";

import { AuthService } from "./auth.service";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AuthGuard } from "./auth.guard";
import { GuestGuard } from "./guest.guard";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { RegisterUserComponent } from "./register-user/register-user.component";
import { RegisterCompanyComponent } from './register-company/register-company.component';

@NgModule({
	imports: [
		CommonModule,
		BrowserModule,
		RouterModule,
		AngularFireAuthModule,
		AngularFirestoreModule,
		ReactiveFormsModule
	],
	providers: [AuthService, AuthGuard, GuestGuard],
	declarations: [RegisterUserComponent, RegisterComponent, LoginComponent, RegisterCompanyComponent]
})
export class CoreModule {}
