import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../services/history.service';
import * as moment from 'moment';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  trips: any;
  page = 1;

  constructor(private historyService: HistoryService) { }

  ngOnInit() {
    this.historyService.getTrips().subscribe(trips => {
      this.trips = trips;
    });
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
