import { Injectable } from "@angular/core";
import { AuthService } from "src/app/core/auth.service";
import {
    AngularFirestore,
    AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Distributor } from "../../database/services/distributor.service";
import { Warehouse } from "../../database/services/warehouse.service";
import * as firebase from "firebase";
import { UserService } from 'src/app/core/user.service';
import { take, tap, flatMap } from 'rxjs/operators';

interface SKU {
    code: string;
    name: string;
    volume: number;
    weight: number;
    value: number;
    qty: number;
}
export interface Order {
    invoice: string;
    distributor: Distributor;
    warehouse: Warehouse;
    volume: number;
    weight: number;
    value: number;
    skus: {};
    status: number;
}
@Injectable({
    providedIn: "root"
})
export class OrderService {
    companyID: string;
    constructor(private userService: UserService, private afs: AngularFirestore) { }

    unassignSKU(invoice, sku): Promise<any> {
        return new Promise((resolve, reject) => {
            const orderRef: AngularFirestoreDocument<any> = this.afs.doc(
                `orders/${this.companyID}`
            );

            orderRef.update({
                [`${invoice}.skus.${sku.code}`]: firebase.firestore.FieldValue.delete()
            })
                .then(res => resolve())
                .catch(err => reject(err));
        });
    }

    assignSKU(invoice, values): Promise<any> {
        return new Promise((resolve, reject) => {
            const orderRef: AngularFirestoreDocument<any> = this.afs.doc(
                `orders/${this.companyID}`
            );
            const sku: SKU = {
                code: values.code.code,
                name: values.name,
                volume: values.volume,
                weight: values.weight,
                value: values.value,
                qty: values.qty
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
        const companyID$ = this.userService.getCompanyID();
        return companyID$.pipe(
            take(1),
            tap(cid => this.companyID = cid), // this method always called first in this service. hence we can use this to cache companyID
            flatMap(cid => {
                const orderRef: AngularFirestoreDocument<any> = this.afs.doc(
                    `orders/${cid}`
                );

                return orderRef.valueChanges();
            }),
        );
    }

    addOrder(values) {
        return this.updateOrderData(this.companyID, values);
    }
    setStatus(order, status) {
        const orderRef: AngularFirestoreDocument<any> = this.afs.doc(
            `orders/${this.companyID}`
        );
        return orderRef.set({ [order.invoice]: { status } }, { merge: true });
    }

    updateOrderData(uid, data): Promise<Order> {
        return new Promise((resolve, reject) => {
            const orderRef: AngularFirestoreDocument<any> = this.afs.doc(
                `orders/${uid}`
            );

            const newOrder: Order = {
                distributor: data.distributor,
                invoice: data.invoice,
                warehouse: data.warehouse,
                volume: data.volume,
                weight: data.weight,
                value: data.value,
                status: 0,
                skus: {}
            };

            return orderRef
                .set({ [newOrder.invoice]: newOrder }, { merge: true })
                .then(res => resolve(newOrder))
                .then(err => reject(err));
        });
    }
}
