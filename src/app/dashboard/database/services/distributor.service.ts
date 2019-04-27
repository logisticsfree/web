import { Injectable } from "@angular/core";
import {
    AngularFirestoreDocument,
    AngularFirestoreCollection,
    AngularFirestore
} from "@angular/fire/firestore";

import { take, tap, flatMap } from "rxjs/operators";

import { UserService } from "src/app/core/user.service";
import { Distributor } from 'src/app/models/Distributor';

@Injectable({
    providedIn: "root"
})
export class DistributorService {
    companyID: string;
    constructor(
        private userService: UserService,
        private afs: AngularFirestore
    ) { }

    getDistributors() {
        const companyID$ = this.userService.getCompanyID();
        return companyID$.pipe(
            take(1),
            tap(cid => this.companyID = cid), // this method always called first in this service. hence we can use this to cache companyID
            flatMap(cid => {
                const distributorRef: AngularFirestoreCollection<any> =
                    this.afs.collection(`distributors/${cid}/distributors`);
                return distributorRef.valueChanges();
            }),
        );
    }
    addDistributor(data) {
        const id = this.afs.createId();
        const distributorRef: AngularFirestoreDocument<any> = this.afs.doc(
            `distributors/${this.companyID}/distributors/${id}`
        );

        const newDistributor: Distributor = {
            id,
            name: data.name,
            longitude: parseFloat(data.longitude),
            latitude: parseFloat(data.latitude)
        };

        return distributorRef.set(newDistributor, {merge: true});
    }

    updateDistributor(id, key, value) {
        const distributorRef: AngularFirestoreDocument<any> = this.afs.doc(
                `distributors/${this.companyID}/distributors/${id}`
        );
        distributorRef.set({[key]: value}, {merge: true});
    }
}
