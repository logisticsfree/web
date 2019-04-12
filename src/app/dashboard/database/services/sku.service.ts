import { Injectable } from '@angular/core';

import {
    AngularFirestore,
    AngularFirestoreDocument
} from '@angular/fire/firestore';
import { take, tap, flatMap } from 'rxjs/operators';

import { UserService } from 'src/app/core/user.service';
import { SKU } from 'src/app/models/SKU';

@Injectable({
    providedIn: 'root'
})
export class SkuService {
    companyID: string;

    constructor(public userService: UserService, private afs: AngularFirestore) {}

    getSKUs() {
        const companyID$ = this.userService.getCompanyID();
        return companyID$.pipe(
            take(1),
            tap(cid => this.companyID = cid), // this method always called first in this service. hence we can use this to cache companyID
            flatMap(cid => {
                const skuRef: AngularFirestoreDocument<any> = this.afs.doc(
                    `skus/${cid}`
                );
                return skuRef.valueChanges();
            }),
        );
    }

    addSku(values) {
        return this.updateSKUData(this.companyID, values);
    }

    updateSKUData(companyID, data): Promise<SKU> {
        return new Promise((resolve, reject) => {
            const skuRef: AngularFirestoreDocument<any> = this.afs.doc(
                `skus/${companyID}`
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
