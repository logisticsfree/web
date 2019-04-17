import { Injectable } from '@angular/core';
import { UserService } from '../core/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { take, tap, map, flatMap } from 'rxjs/operators';
import { Warehouse } from '../models/Warehouse';
import { User } from '../core/auth.service';

@Injectable({
    providedIn: 'root'
})
export class NavbarService {
    userId: string;

    constructor(private afs: AngularFirestore, private userService: UserService) { }

    setWarehouse(warehouse) {

        const uns = this.userService.getUser().subscribe(user => {
            this.userId = user.uid;
            this.afs.doc(`users/${user.uid}`).set({ warehouse }, { merge: true });
            uns.unsubscribe();
        });
    }

    getWarehouse() {
        return this.userService.getUser().pipe(
            take(1),
            flatMap(user => {
                return this.afs.doc<User>(`users/${user.uid}`).valueChanges().pipe(
                    map(user => user.warehouse)
                );
            })
        );
    }
}
