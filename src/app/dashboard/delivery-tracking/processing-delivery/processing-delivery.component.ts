import { Component, OnInit } from '@angular/core';
import { TripService } from '../services/trip.service';

@Component({
  selector: 'app-processing-delivery',
  templateUrl: './processing-delivery.component.html',
  styleUrls: ['./processing-delivery.component.scss']
})
export class ProcessingDeliveryComponent implements OnInit {
  trips: any;

  constructor(private tripService: TripService) { }

  ngOnInit() {
    this.tripService.getProcessingTrips().subscribe(res => this.trips = res);
  }

  getDistributors(trip) {
    let dists = [];
    Object.keys(trip.orders).forEach(key => {
      dists.push(trip.orders[key]);
    });
    return dists;
  }

}
