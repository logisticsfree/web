import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import * as firebase from "firebase";
import { flatMap, take, tap } from 'rxjs/operators';
import { UserService } from 'src/app/core/user.service';
import { Order } from 'src/app/models/Order';
import { SKU } from 'src/app/models/SKU';

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

    updateOrderData(cid, data: Order): Promise<Order> {

        return new Promise((resolve, reject) => {
            const orderRef: AngularFirestoreDocument<any> = this.afs.doc(
                `orders/${cid}`
            );

            const newOrder: Order = {
                invoice: data.invoice,
                distributor: data.distributor,
                volume: data.volume,
                weight: data.weight,
                value: data.value,
                status: 0,
                skus: {}
            };

            return orderRef
                .set({ [newOrder.invoice]: newOrder }, { merge: true })
                .then(res => { 
                    resolve(newOrder)
                })
                .then(err => {
                    reject(err)
                })
                ;
        });
    }
}
