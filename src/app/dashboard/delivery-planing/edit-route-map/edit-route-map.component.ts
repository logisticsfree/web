import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-edit-route-map",
    templateUrl: "./edit-route-map.component.html",
    styleUrls: ["./edit-route-map.component.scss"]
})
export class EditRouteMapComponent implements OnInit {
    origin: any;
    waypoints = [];
    destination: any;
    private _trip: any;

    constructor() {}

    @Input() set trip(trip: any) {
        this._trip = trip;
        let orders: any = Object.values(trip.orders);
        let first: any = orders[0]["distributor"];

        let last: any = orders[orders.length - 1]["distributor"];
        this.origin = { lat: first.latitude, lng: first.longitude };
        this.destination = { lat: last.latitude, lng: last.longitude };

        if (orders.length > 2) {
            for (let i = 1; i < orders.length - 1; i++) {
                const order = orders[i];
                const waypoint = {
                    location: {
                        lat: order["distributor"].latitude,
                        lng: order["distributor"].longitude
                    }
                };
                this.waypoints.push(waypoint);
            }
        }
    }

    get trip() {
        return this._trip;
    }

    ngOnInit() {}
}
