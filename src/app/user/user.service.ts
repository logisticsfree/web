import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: firebase.User;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.getAuthState().subscribe(user => {
      this.user = user;

      if (!user) {
        this.router.navigate(['/login']);
      }
    });
  }

  getUser() {
    return this.user;
  }

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      const usr = firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log('userService', user);
          resolve(user);
        } else {
          reject(null);
        }
      });
    });
  }

  updateCurrentUser(value) {
    return new Promise<any>((resolve, reject) => {
      const user = firebase.auth().currentUser;
      user
        .updateProfile({
          displayName: value.name,
          photoURL: user.photoURL
        })
        .then(
          res => {
            resolve(res);
          },
          err => reject(err)
        );
    });
  }
}
