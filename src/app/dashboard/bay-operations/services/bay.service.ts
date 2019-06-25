import { Injectable } from '@angular/core';
import { UserService } from 'src/app/core/user.service';
import { take, tap, flatMap } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BayService {

  companyID: string;

  constructor(private userService: UserService, private afs: AngularFirestore) { }
  getBays() {
    const companyID$ = this.userService.getCompanyID();
    return companyID$.pipe(
      take(1),
      tap(cid => this.companyID = cid), // this method always called first in this service. hence we can use this to cache companyID
      flatMap(cid => {
        const loadingBayRef: AngularFirestoreCollection<any> = this.afs.collection(
          `loading-bay/${cid}/loading-bay`
        );
        return loadingBayRef.valueChanges();
      }),
    );
  }
}
