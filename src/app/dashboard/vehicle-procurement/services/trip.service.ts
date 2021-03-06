import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from 'src/app/core/user.service';
import { take, tap, flatMap } from 'rxjs/operators';
import { Warehouse } from 'src/app/models/Warehouse';
import { Trip } from 'src/app/models/Trip';

@Injectable({
    providedIn: 'root'
})
export class TripService {
    companyID: string;

    constructor(private afs: AngularFirestore, private userService: UserService) { }

    addPendingTrip(truck: Truck, date: string, time: string, warehouse: Warehouse) {
        const companyID$ = this.userService.getCompanyID();
        return companyID$.pipe(
            take(1),
            // this method always called first in this service.
            // hence we can use this to cache companyID
            tap(cid => this.companyID = cid),
            flatMap(cid => {
                const orderedTrucksRef: AngularFirestoreDocument<any> = this.afs.doc(
                    `order-requests/${cid}/order-requests/${truck.uid}`
                );
                const pendingTrip: Trip = {
                    time, date, truck, warehouse, companyID: cid
                };
                return orderedTrucksRef.set(pendingTrip, { merge: true }).then(res => {
                    this.setTruckUnavailable(truck.uid);
                });
            }),
        );
    }

    setTruckUnavailable(uid) {
        const orderedTrucksRef: AngularFirestoreDocument<any> = this.afs.doc(
            `drivers/${uid}`
        );
        return orderedTrucksRef.set({ available: false }, { merge: true });
    }
}
