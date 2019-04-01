import { Injectable } from "@angular/core";
import {
    AngularFirestore,
    AngularFirestoreDocument
} from "@angular/fire/firestore";
import { AuthService } from "src/app/core/auth.service";
import * as firebase from 'firebase';

interface Truck {
    date: string;
    time: string;
    truck: any;
    orders: any;
}

@Injectable({
    providedIn: "root"
})
export class TruckService {
    constructor(private auth: AuthService, private afs: AngularFirestore) {}

    removeOrder(truck, order) {
        return new Promise((resolve, reject) => {
        const uid = this.auth.user.uid;
        const orderedTrucksRef: AngularFirestoreDocument<any> = this.afs.doc(
            `ordered-trucks/${uid}`
        );
        orderedTrucksRef
            .update({
                [`${truck.truck.vid}.orders.${
                    order.invoice
                }`]: firebase.firestore.FieldValue.delete()
            })
            .then(res => resolve())
            .catch(err => reject(err));
        })
    }

    saveOrderedTruck(truck) {
        const uid = this.auth.user.uid;
        const orderedTrucksRef: AngularFirestoreDocument<any> = this.afs.doc(
            `ordered-trucks/${uid}`
        );
        return this.updateOrderedTruck(uid, truck);
        // console.log(truck);
    }

    updateOrderedTruck(uid, truck) {
        return new Promise((resolve, reject) => {
            const orderRef: AngularFirestoreDocument<any> = this.afs.doc(
                `ordered-trucks/${uid}`
            );

            return orderRef
                .set(
                    { [truck.truck.vid]: { orders: truck.orders } },
                    { merge: true }
                )
                .then(res => resolve(truck))
                .then(err => reject(err));
        });
    }

    getOrderedTrucks() {
        const uid = this.auth.user.uid;
        const orderedTrucksRef: AngularFirestoreDocument<any> = this.afs.doc(
            `ordered-trucks/${uid}`
        );

        return orderedTrucksRef.valueChanges();
    }
}
