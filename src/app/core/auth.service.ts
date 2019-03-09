import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface User {
  uid: string;
  fname: string;
  lname: string;
  phone: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user: Observable<User>;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then(credential => {
      this.updateUserData(credential.user.uid, credential.user);
    });
  }

  public signIn(formValues) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(formValues.email, formValues.password)
      .then(res => {
        this.updateUserData(res.user.uid, formValues);
        this.router.navigate(['/user']);
      });
  }

  public login(formValues) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(formValues.email, formValues.password)
      .then(res => {
        this.router.navigate(['/user']);
      });
  }

  private updateUserData(uid, user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);

    const data: User = {
      uid: uid,
      fname: user.fname,
      lname: user.lname,
      phone: user.phone
    };

    return userRef.set(data, { merge: true });
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      console.log('signOut:done');

      this.router.navigate(['/login']);
    });
  }
}
