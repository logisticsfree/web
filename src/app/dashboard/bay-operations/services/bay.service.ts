import { Injectable } from '@angular/core';
import { UserService } from 'src/app/core/user.service';
import { take, tap, flatMap } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BayService {

  companyID: string;

  constructor(private userService: UserService, private afs: AngularFirestore) { }

  assignOfficer(id: string, bay: string) {
    const officer = { assignedBay: bay };
    return this.userService.getCompanyID().pipe(
      take(1),
      flatMap(cid => {
        return this.afs.doc(
          `bay-officers/${cid}/bay-officers/${id}`
        ).set(officer, { merge: true });
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
}
