import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { GeoCollectionReference, GeoFirestore, GeoQuery, GeoQuerySnapshot } from 'geofirestore';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class GeofirestoreService {

  constructor(private afs: AngularFirestore) { }

  getDriversWithinRadius(location, radius) {
    const geofirestore: GeoFirestore = new GeoFirestore(this.afs.firestore);
    const geocollection: GeoCollectionReference = geofirestore.collection('driver-location');

    const query: GeoQuery = geocollection.near({ center: new firebase.firestore.GeoPoint(6, 1), radius: 1000000 });

    return  query.get();

  }

}
