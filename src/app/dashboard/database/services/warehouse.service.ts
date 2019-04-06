import { Injectable } from "@angular/core";
import { AuthService } from "src/app/core/auth.service";
import {
    AngularFirestore,
    AngularFirestoreDocument
} from "@angular/fire/firestore";

export interface Warehouse {
    name: string;
    latitude: number;
    longitude: number;
}
@Injectable({
    providedIn: "root"
})
export class WarehouseService {
    constructor(private auth: AuthService, private afs: AngularFirestore) {}

    getWarehouses() {
        const uid = this.auth.user.uid;
        const warehouseRef: AngularFirestoreDocument<any> = this.afs.doc(
            `warehouses/${uid}`
        );

        return warehouseRef.get();
    }
    addWarehouse(values) {
        return this.updateWarehouseData(this.auth.user.uid, values);
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
