import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, Input, Output, OnInit, EventEmitter } from "@angular/core";
import { TruckService } from "../services/truck.service";

@Component({
    selector: "app-edit-route-map",
    templateUrl: "./edit-route-map.component.html",
    styleUrls: ["./edit-route-map.component.scss"]
})
export class EditRouteMapComponent implements OnInit {
    warehouse: any;
    orders: any[];
    waypoints = [];
    destination: any;
    coordinates: any = {};
    private _trip: any;

    @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

    constructor(private truckService: TruckService) {}

    ngOnInit() {}

    onMapChange(event) {
        this.onChange.emit(event);
    }

    @Input() set trip(trip: any) {
        this._trip = trip;

        let orders: any[] = Object.values(trip.orders);
        orders.sort((a, b) => (a.seqNo < b.seqNo ? -1 : 1));

        this.orders = orders;
        this.warehouse = trip.warehouse;

        this.coordinates.warehouse = {
            lat: trip.warehouse.latitude,
            lng: trip.warehouse.longitude
        };

        this.classifyOrders(orders);

        console.log({ this: this });
    }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousIndex === event.currentIndex) return;
        moveItemInArray(this.orders, event.previousIndex, event.currentIndex);

        // rearrange the sequence no. of orders
        for (let i = 0; i < this.orders.length; ++i) {
            this.orders[i].seqNo = i;
        }
        this.orders.sort((a, b) => (a.seqNo < b.seqNo ? -1 : 1));
        this.classifyOrders(this.orders);

        this.updateSequence(this.trip.orders);
    }

    updateSequence(orders) {
        this.truckService.updateOrders(this.trip.truck.vid, orders);
    }

    classifyOrders(orders) {
        this.coordinates.waypoints = [];
        this.waypoints = [];
        if (orders.length > 1) {
            for (let i = 0; i < orders.length; i++) {
                const order = orders[i];

                if (!order.seqNo) order.seqNo = i;

                if (i != orders.length - 1) {
                    const waypoint = {
                        location: {
                            lat: order["distributor"].latitude,
                            lng: order["distributor"].longitude
                        }
                    };
                    this.coordinates.waypoints.push(waypoint);
                    this.waypoints.push(order);
                }
            }
        }
        orders.sort((a, b) => (a.seqNo < b.seqNo ? -1 : 1));

        let last: any = orders[orders.length - 1]["distributor"];
        this.destination = orders[orders.length - 1];
        this.coordinates.destination = {
            lat: last.latitude,
            lng: last.longitude
        };
    }

    get trip() {
        return this._trip;
    }
}
