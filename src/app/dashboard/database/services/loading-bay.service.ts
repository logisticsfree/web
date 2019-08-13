import { Injectable } from '@angular/core';
import { UserService } from 'src/app/core/user.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { take, flatMap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoadingBayService {
  companyID: string;

  constructor(private userService: UserService, private afs: AngularFirestore) { }

  removeOfficer(id: string) {
    return this.userService.getCompanyID().pipe(
      take(1),
      map(cid => {
        this.afs.doc(
          `bay-officers/${cid}/bay-officers/${id}`
        ).delete();
      })
    );
  }

  saveOfficer(officer: any) {
    return this.userService.getCompanyID().pipe(
      take(1),
      map(cid => {
        return this.afs.doc(
          `bay-officers/${cid}/bay-officers/${officer.id}`
        ).set(officer, { merge: true });
      })
    );
  }

  addOfficer(officer: any) {
    return this.userService.getCompanyID().pipe(
      take(1),
      map(cid => {
        const officerId = this.afs.createId();
        const bayOffierRef: AngularFirestoreDocument<any> = this.afs.doc(
          `bay-officers/${cid}/bay-officers/${officerId}`
        );
        officer.id = officerId;
        return bayOffierRef.set(officer);
      })
    );
  }

  getOfficers() {
    return this.userService.getCompanyID().pipe(
      take(1),
      flatMap(cid => {
        return this.afs.collection(`bay-officers/${cid}/bay-officers`).valueChanges();
      })
    );
  }

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
      map(cid => {
        const loadingBayRef: AngularFirestoreDocument<any> = this.afs.doc(
          `loading-bay/${cid}/loading-bay/${bayID}`
        );

        return loadingBayRef.delete();
      }),
    );
  }
}
