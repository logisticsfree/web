import { Injectable } from '@angular/core';

import {
    AngularFirestore,
    AngularFirestoreDocument
} from '@angular/fire/firestore';
import { AuthService } from 'src/app/core/auth.service';

export interface SKU {
    code: string;
    name: string;
    volume: number;
    weight: number;
    value: number;
}

@Injectable({
    providedIn: 'root'
})
export class SkuService {
    constructor(public auth: AuthService, private afs: AngularFirestore) {}

    getSKUs() {
        const uid = this.auth.user.uid;
        const skuRef: AngularFirestoreDocument<any> = this.afs.doc(
            `skus/${uid}`
        );

        return skuRef.get();
    }

    addSku(values) {
        return this.updateSKUData(this.auth.user.uid, values);
    }

    updateSKUData(uid, data): Promise<SKU> {
        return new Promise((resolve, reject) => {
            const skuRef: AngularFirestoreDocument<any> = this.afs.doc(
                `skus/${uid}`
            );

            const newSKU: SKU = {
                code: data.code,
                name: data.name,
                volume: data.volume,
                weight: data.weight,
                value: data.value
            };

            return skuRef
                .set({ [newSKU.code]: newSKU }, { merge: true })
                .then(res => resolve(newSKU))
                .then(err => reject(err));
        });
    }
}
