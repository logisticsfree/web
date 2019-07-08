import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from 'src/app/core/user.service';
import { take, tap, flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(
    private userService: UserService,
    private afs: AngularFirestore) { }

  saveEstimates(trip: any) {
      const orderedTrucksRef: AngularFirestoreDocument<any> = this.afs.collection('trips').doc(trip.tripID);
      return orderedTrucksRef.set(
          { estimate: trip.estimate, routed: true },
          { merge: true }
      );
  }

  updateOrders(tripID: any, orders: any) {
    return this.afs.collection('trips').doc(tripID)
      .set({ orders, routed: true }, { merge: true })
  }

  getProcessingTrips() {
    return this.userService.getCompanyID().pipe(
      take(1),
      flatMap(cid => {
        const tripRef: AngularFirestoreCollection<any> = this.afs.collection('trips', res => {
          return res.where('companyID', '==', cid)
              .where('status', ">=", 1);
        });
        return tripRef.valueChanges();
      })
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
