import { Injectable } from '@angular/core';
import {
    AngularFirestoreDocument, AngularFirestoreCollection,
    AngularFirestore
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Order } from 'src/app/models/Order';
import { UserService } from 'src/app/core/user.service';
import { take, tap, flatMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    companyID: string;

    constructor(
        private userService: UserService,
        private afs: AngularFirestore) { }

    getOrders() {
        const companyID$ = this.userService.getCompanyID();
        return companyID$.pipe(
            take(1),
            tap(cid => this.companyID = cid), // this method always called first in this service. hence we can use this to cache companyID
            flatMap(cid => {
                const orderedTrucksRef: AngularFirestoreDocument<any> = this.afs.doc(`ordered-trucks/${cid}`);
                return orderedTrucksRef.valueChanges();
            }),
        );
    }
}


