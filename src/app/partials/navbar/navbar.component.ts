import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
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
  activeNavbar = false;

  constructor(
    public authService: AuthService,
    public mAuth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.afAuth.authState.subscribe(user => {
      this.user = user;
      this.activePreload = false;
    });
  }

  userStatus() {
    const uns = this.authService.afAuth.authState.subscribe(val => {
      console.log('authState', val);
      uns.unsubscribe();
    });
  }

  toggleNavbar() {
    this.activeNavbar = !this.activeNavbar;
  }
  tryLogout() {
    this.authService.signOut();
  }
}
