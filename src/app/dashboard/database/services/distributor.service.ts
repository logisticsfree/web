import { Injectable } from "@angular/core";
import {
    AngularFirestoreDocument,
    AngularFirestore
} from "@angular/fire/firestore";

import { UserService } from "src/app/core/user.service";
import { map, take, tap, flatMap } from "rxjs/operators";
import { AuthService } from "src/app/core/auth.service";

export interface Distributor {
    name: string;
    latitude: number;
    longitude: number;
}

@Injectable({
    providedIn: "root"
})
export class DistributorService {
    // TODO : edit table rows
    companyID: string;
    constructor(
        private auth: AuthService,
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
