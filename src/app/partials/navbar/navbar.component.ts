import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: any;
  activePreload = true;

  constructor(
    public authService: AuthService,
    public mAuth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getAuthState().subscribe(user => {
      console.log('subscribe', user);
      this.user = user;
      this.activePreload = false;
    });
  }

  userStatus() {
    const uns = this.authService.getAuthState().subscribe(val => {
      console.log('authState', val);
      uns.unsubscribe();
    });
  }

  tryLogout() {
    this.authService.doLogout().then(
      res => {
        // not needed: handled in user.service
        // this.router.navigate(['/login']);
      },
      err => console.log(err)
    );
  }
}
