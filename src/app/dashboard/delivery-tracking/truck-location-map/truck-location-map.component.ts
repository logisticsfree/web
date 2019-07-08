import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { TripService } from '../services/trip.service';

@Component({
  selector: 'app-truck-location-map',
  templateUrl: './truck-location-map.component.html',
  styleUrls: ['./truck-location-map.component.scss']
})
export class TruckLocationMapComponent implements OnInit {
  @Input() truckID: string;
  @Input() set trip(trip: any){
      if (!trip) return;
    this._trip = trip;

        let orders: any[] = Object.values(trip.orders);
        orders.sort((a, b) => (a.seqNo < b.seqNo ? -1 : 1));

        this.orders = orders;
        this.warehouse = trip.warehouse;

        this.coordinates['warehouse'] = {
            lat: trip.warehouse.latitude,
            lng: trip.warehouse.longitude
        };

        this.classifyOrders(orders);
        this.updateSequence(this.trip.orders);
  }

  location = {lat: 6.902182, lng: 79.861253, set: false};
  icon = {
    url: './assets/truck-solid.svg',
      scaledSize: {
        width: 25,
        height: 40
      }
  };
  _trip: any;
  orders: any;
  waypoints = [];
  coordinates = {};
  destination: any;
  warehouse: any;

  constructor(private afd: AngularFireDatabase,
    private tripService: TripService) { }

    public renderOptions = {
            suppressMarkers: true,
    };

  ngOnInit() {
    this.afd.list(`driver-locations/${this.truckID}`)
    .valueChanges().subscribe(res => {
      this.location.lat = res[1][0];
      this.location.lng = res[1][1];
      this.location.set = true;
    });
  }

    updateSequence(orders) {
        this.tripService.updateOrders(this.trip.tripID, orders);
    }

    classifyOrders(orders) {
        this.coordinates['waypoints'] = [];
        this.waypoints = [];
        if (orders.length > 1) {
            for (let i = 0; i < orders.length; i++) {
                const order = orders[i];

                // if (!order.seqNo) 
                    order.seqNo = i;

                if (i != orders.length - 1) {
                    const waypoint = {
                        location: {
                            lat: order["distributor"].latitude,
                            lng: order["distributor"].longitude
                        }
                    };
                    this.coordinates['waypoints'].push(waypoint);
                    this.waypoints.push(order);
                }
            }
        }
        orders.sort((a, b) => (a.seqNo < b.seqNo ? -1 : 1));

        let last: any = orders[orders.length - 1]["distributor"];
        this.destination = orders[orders.length - 1];
        this.coordinates['destination'] = {
            lat: last.latitude,
            lng: last.longitude
        };

        // this.markerOptions.destination.label = this.destination.distributor.name;

        // console.log(this.coordinates.destination, this.destination.distributor);
        console.log(this.destination);
        
    }

    onMapChange(event) {
        const legs = event.routes[0].legs;
        let distance = 0;
        let duration = 0;
        legs.forEach(leg => {
            distance += leg.distance.value;
            duration += leg.duration.value;
        });

        let estimates = { distance, duration };
        if (
            this.trip.estimate &&
            this.trip.estimate.duration == estimates.duration &&
            this.trip.estimate.distance == estimates.distance
        ) {
            return;
        }

        this.trip.estimate = estimates;
        this.trip.routed = true;
        this.tripService.saveEstimates(this.trip);
    }

    get trip() {
        return this._trip;
    }
}
