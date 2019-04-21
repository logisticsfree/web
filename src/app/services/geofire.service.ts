import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { GeoFire } from 'geofire';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GeofireService {
    dbRef: any;
    geoFire: any;
    IDs = new BehaviorSubject([]);
    trucks = new BehaviorSubject([]);

    constructor(private db: AngularFireDatabase) {
        this.dbRef = this.db.database.ref('/driver-locations');
        this.geoFire = new GeoFire(this.dbRef);
    }

    getDriverIDsWithinRadius(center: number[], radius: number) {
        this.geoFire.query({
            center,
            radius
        }).on('key_entered', (key, location, distance) => {
            let hit = key;

            let currentIDs = this.IDs.value;
            currentIDs.push(hit);

            this.IDs.next(currentIDs);
        })
    }
    getDriversWithinRadius(center: number[], radius: number) {
        this.geoFire.query({
            center,
            radius
        }).on('key_entered', (key, location, distance) => {
            let hit = { key, location, distance }

            let currentTrucks = this.trucks.value;
            currentTrucks.push(hit);

            this.trucks.next(currentTrucks);
        })
    }
}
