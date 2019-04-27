import { Injectable } from '@angular/core';

import {
    AngularFirestore,
    AngularFirestoreDocument,
    AngularFirestoreCollection
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

// not used
    getSKUSnaps() {
        const companyID$ = this.userService.getCompanyID();
        return companyID$.pipe(
            take(1),
            tap(cid => this.companyID = cid), // this method always called first in this service. hence we can use this to cache companyID
            flatMap(cid => {
                const skuRef: AngularFirestoreCollection<any> = this.afs.collection(
                    `skus/${cid}/skus`
                );
                return skuRef.snapshotChanges();
            }),
        );
    }

    getSKUs() {
        const companyID$ = this.userService.getCompanyID();
        return companyID$.pipe(
            take(1),
            tap(cid => this.companyID = cid), // this method always called first in this service. hence we can use this to cache companyID
            flatMap(cid => {
                const skuRef: AngularFirestoreCollection<any> = this.afs.collection(
                    `skus/${cid}/skus`
                );
                return skuRef.valueChanges();
            }),
        );
    }

    addSku(data) {
        const id = this.afs.createId();
        const skuRef: AngularFirestoreDocument<any> = this.afs.doc(
            `skus/${this.companyID}/skus/${id}`
        );

        const newSKU: SKU = {
            id, 
            code: data.code,
            name: data.name,
            volume: data.volume,
            weight: data.weight,
            value: data.value
        };

        return skuRef.set(newSKU);
    }

    updateSKU(id, key, value) {
        const skuRef: AngularFirestoreDocument<any> = this.afs.doc(
            `skus/${this.companyID}/skus/${id}`
        );

        return skuRef.set({[key]: value}, { merge: true })
    }
}
