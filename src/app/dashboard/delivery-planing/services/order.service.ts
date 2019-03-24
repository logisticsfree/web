import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import {
    AngularFirestoreDocument,
    AngularFirestore
} from '@angular/fire/firestore';
import { Distributor } from '../../database/services/distributor.service';
import { SKU } from '../../database/services/sku.service';

export interface Order {
    invoice: string;
    distributor: Distributor;
    volume: number;
    weight: number;
    value: number;
}
@Injectable({
    providedIn: 'root'
})
export class OrderService {
    constructor(private auth: AuthService, private afs: AngularFirestore) {}

    assignSKU(invoice, values) {
        return new Promise((resolve, reject) => {
            const uid = this.auth.user.uid;
            const orderRef: AngularFirestoreDocument<any> = this.afs.doc(
                `orders/${uid}`
            );
            const sku: SKU = {
                code: values.code.code,
                name: values.name,
                volume: values.volume,
                weight: values.weight,
                value: values.value
            };

            orderRef
                .set(
                    { [invoice]: { skus: { [sku.code]: sku } } },
                    { merge: true }
                )
                .then(res => resolve(sku))
                .catch(err => reject(err));
        });
    }

    getOrders() {
        const uid = this.auth.user.uid;
        const orderRef: AngularFirestoreDocument<any> = this.afs.doc(
            `orders/${uid}`
        );

        return orderRef.get();
    }

    addOrder(values) {
        return this.updateOrderData(this.auth.user.uid, values);
    }

    updateOrderData(uid, data): Promise<Order> {
        return new Promise((resolve, reject) => {
            const orderRef: AngularFirestoreDocument<any> = this.afs.doc(
                `orders/${uid}`
            );

            const newOrder: Order = {
                distributor: data.distributor,
                invoice: data.invoice,
                volume: data.volume,
                weight: data.weight,
                value: data.value
            };

            return orderRef
                .set({ [newOrder.invoice]: newOrder }, { merge: true })
                .then(res => resolve(newOrder))
                .then(err => reject(err));
        });
    }
}
