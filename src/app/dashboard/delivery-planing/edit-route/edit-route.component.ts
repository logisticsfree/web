import { Component, OnInit } from '@angular/core';
import { TruckService } from '../services/truck.service';
import * as moment from 'moment';

@Component({
    selector: 'app-edit-route',
    templateUrl: './edit-route.component.html',
    styleUrls: ['./edit-route.component.scss']
})
export class EditRouteComponent implements OnInit {
    trucks: any;
    get trucksWithOrders() {
        return this.trucks.filter(truck => {
            if (
                Object.keys(truck['orders']).length === 0 &&
                truck['orders'].constructor === Object
            ) {
                return null;
            } else {
                return truck;
            }
        });
    }

    selectedTrip: any;

    constructor(private truckService: TruckService) { }

    ngOnInit() {
        this.truckService.getOrderedTrucks().subscribe(trucks => {
            this.trucks = Object.values(trucks);
        });
    }

    gotDirection(event) {
        const legs = event.routes[0].legs;
        let distance = 0;
        let duration = 0;
        legs.forEach(leg => {
            distance += leg.distance.value;
            duration += leg.duration.value;
        });

        const estimates = { distance, duration };
        if (
            this.selectedTrip.estimate &&
            this.selectedTrip.estimate.duration === estimates.duration &&
            this.selectedTrip.estimate.distance === estimates.distance
        ) {
            return;
        }

        this.selectedTrip.estimate = estimates;
        this.selectedTrip.routed = true;
        this.truckService.saveEstimates(this.selectedTrip);
    }

    formatDuration(time) {
        return moment.duration(time, 'seconds').humanize();
    }
    formatDistance(distance) {
        const km = distance / 1000;
        if (km < 1) {
            return distance + ' m';
        } else {
            return km + ' km';
        }
    }

    selectTrip(truck) {
        this.selectedTrip = truck;
    }

    // TODO : replace with firebase Function
    getTotalWeight(truck) {
        // this.selectedTrip = truck;
        if (!truck.orders) { return 0; }
        let totalWeight = 0;
        Object.values(truck.orders).forEach(order => {
            totalWeight += parseFloat(order['weight']);
        });
        return totalWeight;
    }

    // TODO : replace with firebase Function
    getTotalVolume(truck) {
        if (!truck.orders) { return 0; }
        let totalVolume = 0;
        Object.values(truck.orders).forEach(order => {
            totalVolume += parseFloat(order['volume']);
        });
        return totalVolume;
    }
}
