import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from 'src/app/core/user.service';
import { take, tap, flatMap } from 'rxjs/operators';
import { Warehouse } from 'src/app/models/Warehouse';
import { Trip } from 'src/app/modals/Trip';

@Injectable({
    providedIn: 'root'
})
export class TruckService {
    companyID: string;

    constructor(private afs: AngularFirestore, private userService: UserService) { }

}
