import { Injectable } from '@angular/core';
import { UserService } from 'src/app/core/user.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { take, tap, flatMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderedTrucksService {
  companyID: string;

  constructor(
    private userService: UserService,
    private afs: AngularFirestore
  ) { }

  assignToBay(truckID: string, bay: any) {
    const companyID$ = this.userService.getCompanyID();
    return companyID$.pipe(
      take(1),
      tap(cid => this.companyID = cid), // this method always called first in this service. hence we can use this to cache companyID
      map(cid => {
        const orderedTruckRef: AngularFirestoreDocument<any> =
          this.afs.doc(`ordered-trucks/${cid}/ordered-trucks/${truckID}`);
        return orderedTruckRef.set({ bay }, { merge: true });
      }),
    );
  }

  getOrderedTrucks() {
    const companyID$ = this.userService.getCompanyID();
    return companyID$.pipe(
      take(1),
      tap(cid => this.companyID = cid), // this method always called first in this service. hence we can use this to cache companyID
      flatMap(cid => {
        const orderedTruckRef: AngularFirestoreCollection<any> =
          this.afs.collection(`ordered-trucks/${cid}/ordered-trucks`);
        return orderedTruckRef.valueChanges();
      }),
    );
  }

  getTruckDetails(truckID: string) {
    const companyID$ = this.userService.getCompanyID();
    return companyID$.pipe(
      take(1),
      tap(cid => this.companyID = cid), // this method always called first in this service. hence we can use this to cache companyID
      flatMap(cid => {
        return this.afs.doc(`/ordered-trucks/${cid}/ordered-trucks/${truckID}`).valueChanges()
      }),
    );
  }
}
