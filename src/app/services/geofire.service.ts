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
    hits = new BehaviorSubject([]);

    constructor(private db: AngularFireDatabase) {
        this.dbRef = this.db.database.ref('/driver-locations');
        this.geoFire = new GeoFire(this.dbRef);
    }

    getDriverIDsWithinRadius(location, radius) {
        this.geoFire.query({
            center: location,
            radius
        }).on('key_entered', (key, location, distance) => {
            let hit = key;

            let currentHits = this.hits.value;
            currentHits.push(hit);

            this.hits.next(currentHits);
        })
    }
    getDriversWithinRadius(location, radius) {
        this.geoFire.query({
            center: location,
            radius
        }).on('key_entered', (key, location, distance) => {
            let hit = { key, location, distance }

            let currentHits = this.hits.value;
            currentHits.push(hit);

            this.hits.next(currentHits);
        })
    }
}
