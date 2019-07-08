import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, flatMap, tap } from 'rxjs/operators';
import { TripService } from '../services/trip.service';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import * as moment from "moment";

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})
export class TripDetailsComponent implements OnInit {

  trip: any;
  orders: any;
  waypoints = [];
  coordinates = {};
  destination: any;
  warehouse: any;

  constructor(
    private aRouter: ActivatedRoute,
    private router: Router,
    private tripService: TripService) { }

    ngOnInit() {
        this.aRouter.queryParams.pipe(
            map(params => params['tripID']),
            flatMap(tripID => this.tripService.getTruckDetails(tripID)),
        ).subscribe(trip => {        
            if (!trip) {
                this.router.navigate(['/delivery-tracking'])
                return;
            }
            this.trip = trip;
            let orders: any[] = Object.values(trip['orders']);
            orders.sort((a, b) => (a.seqNo < b.seqNo ? -1 : 1));

            this.orders = orders;

            this.rearrangeOrders(this.trip.orders);
        });
    }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousIndex === event.currentIndex) return;
        moveItemInArray(this.orders, event.previousIndex, event.currentIndex);

        // rearrange the sequence no. of orders
        for (let i = 0; i < this.orders.length; ++i) {
            this.orders[i].seqNo = i;
        }
        this.orders.sort((a, b) => (a.seqNo < b.seqNo ? -1 : 1));
        
        this.rearrangeOrders(this.trip.orders);
    }

    rearrangeOrders(orders) {
        this.tripService.updateOrders(this.trip.tripID, orders);
    }

    
    formatDuration(time) {
        return moment.duration(time, "seconds").humanize();
    }
    formatDistance(distance) {
        let km = distance / 1000;
        if (km < 1) {
            return distance + " m";
        } else {
            return km + " km";
        }
    }
}
