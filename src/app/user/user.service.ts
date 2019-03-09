import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { FirebaseFirestore } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: firebase.User;

  constructor(
    // private authService: AuthService,
    private router: Router,
    private db: AngularFirestore
  ) {}

  getUser() {
    return this.user;
  }

  addUser(id, formValues) {
    this.db
      .collection('users')
      .doc(id)
      .set({
        fname: formValues.fname,
        lname: formValues.lname,
        phone: formValues.phone
      });
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
