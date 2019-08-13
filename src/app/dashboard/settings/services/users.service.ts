import { Injectable } from '@angular/core';
import { UserService } from 'src/app/core/user.service';
import { take, flatMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';
import { User } from 'src/app/core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private userService: UserService, private afs: AngularFirestore) { }

  createUser(formValues) {
    const secondaryApp = firebase.initializeApp(environment.firebase, 'Secondary');

    return secondaryApp.auth()
      .createUserWithEmailAndPassword(formValues.email, formValues.password)
      .then((firebaseUser) => {
        return this.userService.getCompanyID().pipe(
          take(1),
          flatMap(cid => {
            formValues.companyID = cid;
            return this.updateUserData(firebaseUser.user.uid, formValues);
          })
        ).subscribe();
      }).finally(() => {
        secondaryApp.auth().signOut();
        secondaryApp.delete();
      });
  }

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

  getUsers() {
    return this.userService.getCompanyID().pipe(
      take(1),
      flatMap(cid => {
        return this.afs.collection(`users`, res => {
          return res.where('companyID', '==', cid);
        }).valueChanges();
      })
    );
  }
}
