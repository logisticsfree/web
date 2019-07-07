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

  assignToBay(tripID: string, bay: any) {
    const companyID$ = this.userService.getCompanyID();
    return companyID$.pipe(
      take(1),
      map(cid => {
        const orderedTruckRef: AngularFirestoreDocument<any> = this.afs.doc(`trips/${tripID}`);
          return orderedTruckRef.set({ bay }, { merge: true });
      }),
    );
  }

  getOrderedTrucks() {
    const companyID$ = this.userService.getCompanyID();
    return companyID$.pipe(
      take(1),
      flatMap(cid => {
        const orderedTruckRef: AngularFirestoreCollection<any> = this.afs.collection('trips');
        return orderedTruckRef.valueChanges();
      }),
    );
  }

  getTruckDetails(tripID: string) {
    const companyID$ = this.userService.getCompanyID();
    return companyID$.pipe(
      take(1),
      flatMap(cid => {
        return this.afs.doc(`trips/${tripID}`).valueChanges()
      }),
    );
  }
}
