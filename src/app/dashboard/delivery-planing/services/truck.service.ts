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

    removeOrder(truck, order) {
        return new Promise((resolve, reject) => {
            const orderedTruckRef: AngularFirestoreDocument<any> =
                this.afs.collection(`ordered-trucks/${this.companyID}/ordered-trucks`).doc(truck.truck.uid);

            orderedTruckRef
                .update({
                    [`orders.${
                        order.invoice
                        }`]: firebase.firestore.FieldValue.delete()
                })
                .then(res => resolve())
                .catch(err => reject(err));
        });
    }
    saveEstimates(truck) {
        const orderedTrucksRef: AngularFirestoreDocument<any> = this.afs.collection(
            `ordered-trucks/${this.companyID}/ordered-trucks`
        ).doc(truck.truck.uid);
        return orderedTrucksRef.set(
            { estimate: truck.estimate },
            { merge: true }
        );
    }

    saveOrderedTruck(truck) {
        const orderedTrucksRef: AngularFirestoreCollection<any> = this.afs.collection(
            `ordered-trucks/${this.companyID}/ordered-trucks`
        );
        return this.updateOrderedTruck(this.companyID, truck);
    }

    updateOrders(driverID, orders) {
        const orderedTrucksRef: AngularFirestoreDocument<any> = this.afs.collection(
            `ordered-trucks/${this.companyID}/ordered-trucks`
        ).doc(driverID);
        
        return orderedTrucksRef.set({ orders }, { merge: true });
    }

    updateOrderedTruck(uid, truck) {

        return new Promise((resolve, reject) => {
            const orderRef: AngularFirestoreDocument<any> = this.afs.collection(
                `ordered-trucks/${uid}/ordered-trucks`
            ).doc(truck.truck.uid);

            return orderRef
                .set(
                    { orders: truck.orders },
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
                const orderedTrucksRef: AngularFirestoreCollection<any> = this.afs.collection(
                    `ordered-trucks/${cid}/ordered-trucks`
                );
                return orderedTrucksRef.valueChanges();
            }),
        );
    }
}
