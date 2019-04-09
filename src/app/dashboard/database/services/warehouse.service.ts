import { Injectable } from "@angular/core";
import { AuthService } from "src/app/core/auth.service";
import {
    AngularFirestore,
    AngularFirestoreDocument
} from "@angular/fire/firestore";
import { UserService } from 'src/app/core/user.service';
import { flatMap, tap, take } from 'rxjs/operators';

export interface Warehouse {
    name: string;
    latitude: number;
    longitude: number;
}
@Injectable({
    providedIn: "root"
})
export class WarehouseService {
    companyID: string;

    constructor(private userService: UserService, private afs: AngularFirestore) {}

    getWarehouses() {
        const companyID$ = this.userService.getCompanyID();
        return companyID$.pipe(
            take(1),
            tap(cid => this.companyID = cid), // this method always called first in this service. hence we can use this to cache companyID
            flatMap(cid => {
                const warehouseRef: AngularFirestoreDocument<any> = this.afs.doc(
                    `warehouses/${cid}`
                );
                return warehouseRef.valueChanges();
            }),
        );
    }
    addWarehouse(values) {
        return this.updateWarehouseData(this.companyID, values);
    }

    updateWarehouseData(uid, data): Promise<Warehouse> {
        return new Promise((resolve, reject) => {
            const warehouseRef: AngularFirestoreDocument<any> = this.afs.doc(
                `warehouses/${uid}`
            );

            const newDistributor: Warehouse = {
                name: data.name,
                longitude: parseFloat(data.longitude),
                latitude: parseFloat(data.latitude)
            };

            return warehouseRef
                .set({ [newDistributor.name]: newDistributor }, { merge: true })
                .then(res => resolve(newDistributor))
                .then(err => reject(err));
        });
    }
}
