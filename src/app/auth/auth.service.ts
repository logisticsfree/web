import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  authState: any;
  user: Observable<User>;

  constructor(
    public db: AngularFirestore,
    public mAuth: AngularFireAuth,
    public router: Router
  ) {
    // this.mAuth.authState.subscribe((auth) => {
    //   console.log('construct auth', auth);
    //   this.authState = auth;
    // });
    // firebase.auth().onAuthStateChanged(user => {
    //   console.log('onstatechange', user);
    // });
    this.user = this.mAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  getAuthState() {
    return this.mAuth.authState;
  }

  // isAuth() {
  // return this.mAuth.authState.pipe(first()).toPromise();
  // return this.authState;
  // }
  get isAuth(): boolean {
    return this.authState !== null;
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.mAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err));
    });
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err));
    });
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.mAuth.auth.signOut();
        resolve(true);
      } else {
        reject(false);
      }
    });
  }
}
