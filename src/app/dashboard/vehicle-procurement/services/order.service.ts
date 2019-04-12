import { Injectable } from '@angular/core';
import {
  AngularFirestoreDocument,AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Order } from 'src/app/models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
	ordersCollection: AngularFirestoreCollection<Order>;
	orders: Observable<Order[]>;
  constructor(public afs: AngularFirestore){
  	this.orders= this.afs.collection<Order>('orders').valueChanges();
   }

   getOrders(){
   	return this.orders;
   }
}


