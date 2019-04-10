import { Injectable } from "@angular/core";
import {
    AngularFirestoreDocument,
    AngularFirestore
} from "@angular/fire/firestore";

import { take, tap, flatMap } from "rxjs/operators";

import { UserService } from "src/app/core/user.service";
import { Distributor } from 'src/app/models/Distributor';

@Injectable({
    providedIn: "root"
})
export class DistributorService {
    // TODO : edit table rows
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
                const distributorRef: AngularFirestoreDocument<any> =
                    this.afs.doc(`distributors/${cid}`);
                return distributorRef.valueChanges();
            }),
        );
    }
    addDistributor(values) {
        return this.updateDistributorData(
            this.companyID,
            values
        );
    }

    updateDistributorData(companyID, data): Promise<Distributor> {
        return new Promise((resolve, reject) => {
            const distributorRef: AngularFirestoreDocument<any> = this.afs.doc(
                `distributors/${companyID}`
            );

            const newDistributor: Distributor = {
                name: data.name,
                longitude: parseFloat(data.longitude),
                latitude: parseFloat(data.latitude)
            };

            return distributorRef
                .set({ [newDistributor.name]: newDistributor }, { merge: true })
                .then(res => resolve(newDistributor))
                .then(err => reject(err));
        });
    }
}
