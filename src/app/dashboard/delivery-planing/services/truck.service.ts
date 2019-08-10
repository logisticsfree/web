import { Injectable } from "@angular/core";
import {
    AngularFirestore,
    AngularFirestoreDocument,
    AngularFirestoreCollection
} from "@angular/fire/firestore";
import * as firebase from "firebase";
import { take, tap, flatMap } from 'rxjs/operators';

import { UserService } from 'src/app/core/user.service';

@Injectable({
    providedIn: "root"
})
export class TruckService {
    companyID: string;
    constructor(private userService: UserService, private afs: AngularFirestore) { }

    // used:
    removeOrder(truck, order) {
        return new Promise((resolve, reject) => {
            const orderedTruckRef: AngularFirestoreDocument<any> =
                this.afs.collection('trips').doc(truck.tripID);

            orderedTruckRef
                .update({
                    [`orders.${ order.invoice }`]: firebase.firestore.FieldValue.delete(),
                    routed: false
                })
                .then(res => resolve())
                .catch(err => reject(err));
        });
    }
    saveEstimates(truck) {
        const orderedTrucksRef: AngularFirestoreDocument<any> = this.afs.collection('trips').doc(truck.tripID);
        return orderedTrucksRef.set(
            { estimate: truck.estimate, routed: true },
            { merge: true }
        );
    }
// used: to assign orders to truck
    saveOrderedTruck(truck) {
        return this.updateOrderedTruck(truck.tripID, truck);
    }

    // used: to split order
    updateOrders(tripID: string, orders: any) {
        const orderedTrucksRef: AngularFirestoreDocument<any> = this.afs.collection('trips').doc(tripID);
        
        return orderedTrucksRef.set({ orders, routed: true }, { merge: true });
    }

    // used:
    updateOrderedTruck(tripID, truck) {
        return new Promise((resolve, reject) => {
            const orderRef: AngularFirestoreDocument<any> = this.afs.doc(`trips/${tripID}`);

            return orderRef
                .set(
                    { orders: truck.orders, routed: truck.routed },
                    { merge: true }
                )
                .then(res => resolve(truck))
                .then(err => reject(err));
        });
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

    // used:
    getOrderedTrucks() {
        const companyID$ = this.userService.getCompanyID();
        return companyID$.pipe(
            take(1),
            // this method always called first in this service. hence we can use this to cache companyID
            tap(cid => this.companyID = cid), 
            flatMap(cid => {
                const orderedTrucksRef: AngularFirestoreCollection<any> = this.afs.collection('trips', ref => {
                    return ref.where('companyID', '==', cid);
                })
                return orderedTrucksRef.valueChanges();
            }),
        );
    }
}
