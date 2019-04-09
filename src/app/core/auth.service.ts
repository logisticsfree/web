import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
    AngularFirestore,
    AngularFirestoreDocument
} from "@angular/fire/firestore";

import { Observable, of, pipe } from "rxjs";
import { switchMap, tap, take } from "rxjs/operators";

export interface User {
    uid: string;
    companyID: string;
    fname: string;
    lname: string;
    phone: string;
}
export interface Company {
    uid: string;
    name: string;
    phone: string;
}

@Injectable({ providedIn: "root" })
export class AuthService {
    userData$: Observable<User | Company>;
    userAuth: firebase.User;
    userData: User | Company;

    constructor(
        public afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router
    ) {
        //// Get auth data, then get firestore user document || null
        this.userData$ = this.afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    this.userAuth = user;

                    const userRef = this.afs
                        .doc<User | Company>(`users/${user.uid}`)
                        .valueChanges();
                        userRef.pipe(take(1)).toPromise();

                    return userRef;
                } else {
                    return of(null);
                }
            })
        );
    }

    // NOT used
    googleLogin() {
        const provider = new auth.GoogleAuthProvider();
        return this.oAuthLogin(provider);
    }

    private oAuthLogin(provider) {
        return this.afAuth.auth.signInWithPopup(provider).then(credential => {
            this.updateUserData(credential.user.uid, credential.user);
        });
    }

    // used
    public signInUser(formValues) {
        return this.afAuth.auth
            .createUserWithEmailAndPassword(
                formValues.email,
                formValues.password
            )
            .then(res => {
                this.updateUserData(res.user.uid, formValues);
                this.router.navigate(["/user"]);
            });
    }
    // used
    public signInCompany(formValues) {
        return this.afAuth.auth
            .createUserWithEmailAndPassword(
                formValues.email,
                formValues.password
            )
            .then(res => {
                this.updateCompanyData(res.user.uid, formValues);
                this.router.navigate(["/user"]);
            });
    }

    public login(formValues) {
        return this.afAuth.auth
            .signInWithEmailAndPassword(formValues.email, formValues.password)
            .then(res => {
                this.router.navigate(["/user"]);
            });
    }
    // Sets user data to firestore on login
    private updateUserData(uid, user) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(
            `users/${uid}`
        );

        const data: User = {
            uid: uid,
            companyID: user.companyID,
            fname: user.fname,
            lname: user.lname,
            phone: user.phone
        };

        return userRef.set(data, { merge: true });
    }

    // Sets company data to firestore on login
    private updateCompanyData(uid, user) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(
            `users/${uid}`
        );

        const data: Company = {
            uid: uid,
            name: user.name,
            phone: user.phone
        };

        return userRef.set(data, { merge: true });
    }

    signOut() {
        this.afAuth.auth.signOut().then(() => {
            this.router.navigate(["/login"]);
        });
    }
}
