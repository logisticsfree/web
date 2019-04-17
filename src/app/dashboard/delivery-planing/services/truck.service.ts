import { Injectable } from "@angular/core";
import {
    AngularFirestore,
    AngularFirestoreDocument
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

    removeOrder(truck, order) {
        return new Promise((resolve, reject) => {
            const orderedTrucksRef: AngularFirestoreDocument<any> =
                this.afs.doc(`ordered-trucks/${this.companyID}`);

            orderedTrucksRef
                .update({
                    [`${truck.truck.truck.vid}.orders.${
                        order.invoice
                        }`]: firebase.firestore.FieldValue.delete()
                })
                .then(res => resolve())
                .catch(err => reject(err));
        });
    }
    saveEstimates(truck) {
        const orderedTrucksRef: AngularFirestoreDocument<any> = this.afs.doc(
            `ordered-trucks/${this.companyID}`
        );
        return orderedTrucksRef.set(
            { [truck.truck.truck.vid]: { estimate: truck.estimate } },
            { merge: true }
        );
    }

    saveOrderedTruck(truck) {
        const orderedTrucksRef: AngularFirestoreDocument<any> = this.afs.doc(
            `ordered-trucks/${this.companyID}`
        );
        return this.updateOrderedTruck(this.companyID, truck);
        // console.log(truck);
    }

    updateOrders(truckId, orders) {
        const orderedTrucksRef: AngularFirestoreDocument<any> = this.afs.doc(
            `ordered-trucks/${this.companyID}`
        );
        return orderedTrucksRef.set(
            {
                [truckId]: { orders }
            },
            { merge: true }
        );
    }

    updateOrderedTruck(uid, truck) {

        return new Promise((resolve, reject) => {
            const orderRef: AngularFirestoreDocument<any> = this.afs.doc(
                `ordered-trucks/${uid}`
            );

            return orderRef
                .set(
                    { [truck.truck.truck.vid]: { orders: truck.orders } },
                    { merge: true }
                )
                .then(res => resolve(truck))
                .then(err => reject(err));
        });
    }

    getOrderedTrucks() {
        const companyID$ = this.userService.getCompanyID();
        return companyID$.pipe(
            take(1),
            tap(cid => this.companyID = cid), // this method always called first in this service. hence we can use this to cache companyID
            flatMap(cid => {
                const orderedTrucksRef: AngularFirestoreDocument<any> = this.afs.doc(
                    `ordered-trucks/${cid}`
                );
                return orderedTrucksRef.valueChanges();
            }),
        );
    }
}
