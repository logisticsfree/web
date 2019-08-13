import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import {
    AngularFirestore,
    AngularFirestoreDocument,
    AngularFirestoreCollection
} from '@angular/fire/firestore';
import { flatMap, tap, take } from 'rxjs/operators';

import { UserService } from 'src/app/core/user.service';
import { Warehouse } from 'src/app/models/Warehouse';

@Injectable({
    providedIn: 'root'
})
export class WarehouseService {
    companyID: string;

    constructor(private userService: UserService, private afs: AngularFirestore) { }

    getWarehouses() {
        const companyID$ = this.userService.getCompanyID();
        return companyID$.pipe(
            // this method always called first in this service.
            // hence we can use this to cache companyID
            tap(cid => this.companyID = cid),
            flatMap(cid => {
                if (!cid) {
                    return [];
                } else {
                    const warehouseRef: AngularFirestoreCollection<any> = this.afs.collection(
                        `warehouses/${cid}/warehouses`
                    );
                    return warehouseRef.valueChanges();
                }
            }),
        );
    }

    addWarehouse(data) {
        const id = this.afs.createId();
        const warehouseRef: AngularFirestoreDocument<any> = this.afs.doc(
            `warehouses/${this.companyID}/warehouses/${id}`
        );

        const newDistributor: Warehouse = {
            id,
            name: data.name,
            longitude: parseFloat(data.longitude),
            latitude: parseFloat(data.latitude)
        };

        return warehouseRef
            .set(newDistributor, { merge: true });
    }

    updateWarehouse(id, key, value) {
        if (!id || !key || !value) { return; }
        value = parseFloat(value) || value;
        const warehouseRef: AngularFirestoreDocument<any> = this.afs.doc(
            `warehouses/${this.companyID}/warehouses/${id}`
        );

        return warehouseRef
            .set({ [key]: value }, { merge: true });
    }
}
