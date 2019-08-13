import { Component, OnInit } from '@angular/core';
import { TripService } from '../services/trip.service';
import * as moment from 'moment';

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
    const dists = [];
    Object.keys(trip.orders).forEach(key => {
      dists.push(trip.orders[key]);
    });
    return dists;
  }
  formatDuration(time) {
    return moment.duration(time, 'seconds').humanize();
  }
}
