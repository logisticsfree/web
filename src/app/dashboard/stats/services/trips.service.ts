import { Injectable } from '@angular/core';
import { UserService } from 'src/app/core/user.service';
import { AngularFireFunctions } from '@angular/fire/functions';
import { take, flatMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  baseUrl = 'https://us-central1-practice-4eea4.cloudfunctions.net/getTripStats';
  data$: any;

  constructor(
    private userService: UserService,
    private fns: AngularFireFunctions,
    private afs: AngularFirestore,
    private http: HttpClient) {
    // const callable = fns.httpsCallable('testfunction');
    // this.data$ = callable({ name: 'simple-data' });
    // this.data$ = this.http.get('https://us-central1-practice-4eea4.cloudfunctions.net/testfunction');
  }

  getCurrentTrips() {
    return this.userService.getCompanyID().pipe(
      take(1),
      flatMap(cid => {
        return this.afs.collection('trips', res => {
          return res.where('companyID', '==', cid);
        }).valueChanges();
      })
    );
  }

  getCompletedTrips() {
    return this.userService.getCompanyID().pipe(
      take(1),
      flatMap(cid => {
        return this.afs.collection('completed-trips', res => {
          return res.where('companyID', '==', cid);
        }).valueChanges().pipe(
          map(trips => {
            const output = {};
            trips.forEach(trip => {
              const date = trip['date'];
              output[date] = output[date] != undefined ? output[date] + 1 : 1;
            });
            return output;
          }));
      })
    );

    // return this.http.get(this.baseUrl);
  }
}
