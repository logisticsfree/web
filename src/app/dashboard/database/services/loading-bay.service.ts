import { Injectable } from '@angular/core';
import { UserService } from 'src/app/core/user.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { take, tap, flatMap, map } from 'rxjs/operators';
import * as firebase from "firebase";


@Injectable({
  providedIn: 'root'
})
export class LoadingBayService {
  companyID: string;

  constructor(private userService: UserService, private afs: AngularFirestore) { }

  assignType(bayID, type) {
    const companyID$ = this.userService.getCompanyID();
    return companyID$.pipe(
      take(1),
      map(cid => {
        const loadingBayRef: AngularFirestoreDocument<any> = this.afs.doc(
          `loading-bay/${cid}/loading-bay/${bayID}`
        );

        return loadingBayRef.set({ types: { [type]: true } }, { merge: true });
      }),
    );
  }

  unassignType(bayID, types, type) {
    console.log(types);

    const companyID$ = this.userService.getCompanyID();
    return companyID$.pipe(
      take(1),
      map(cid => {
        const loadingBayRef: AngularFirestoreDocument<any> = this.afs.doc(
          `loading-bay/${cid}/loading-bay/${bayID}`
        );

        return loadingBayRef.update({ types });
      }),
    );
  }

  getBays() {
    const companyID$ = this.userService.getCompanyID();
    return companyID$.pipe(
      take(1),
      tap(cid => this.companyID = cid), // this method always called first in this service. hence we can use this to cache companyID
      flatMap(cid => {
        const loadingBayRef: AngularFirestoreCollection<any> = this.afs.collection(
          `loading-bay/${cid}/loading-bay`
        );
        return loadingBayRef.valueChanges();
      }),
    );
  }
  addBay(bay: any) {
    const companyID$ = this.userService.getCompanyID();
    return companyID$.pipe(
      take(1),
      tap(cid => this.companyID = cid), // this method always called first in this service. hence we can use this to cache companyID
      map(cid => {
        const bid = this.afs.createId();
        bay.id = bid;
        const loadingBayRef: AngularFirestoreDocument<any> = this.afs.doc(
          `loading-bay/${cid}/loading-bay/${bid}`
        );

        return loadingBayRef.set(bay);
      }),
    );
  }

  removeBay(bayID) {
    const companyID$ = this.userService.getCompanyID();
    return companyID$.pipe(
      take(1),
      tap(cid => this.companyID = cid), // this method always called first in this service. hence we can use this to cache companyID
      map(cid => {
        const loadingBayRef: AngularFirestoreDocument<any> = this.afs.doc(
          `loading-bay/${cid}/loading-bay/${bayID}`
        );

        return loadingBayRef.delete();
      }),
    );
  }
}
