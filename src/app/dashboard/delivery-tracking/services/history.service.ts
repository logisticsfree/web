import { Injectable } from '@angular/core';
import { UserService } from 'src/app/core/user.service';
import { take, flatMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private userService: UserService, private afs: AngularFirestore) { }
  getTrips() {
    return this.userService.getCompanyID().pipe(
      take(1),
      flatMap(cid => {
        return this.afs.collection('completed-trips', res => {
          return res.where('companyID', '==', cid);
        }).valueChanges();
      })
    );
  }
}
