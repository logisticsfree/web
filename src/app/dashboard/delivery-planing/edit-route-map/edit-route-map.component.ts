import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-edit-route-map",
    templateUrl: "./edit-route-map.component.html",
    styleUrls: ["./edit-route-map.component.scss"]
})
export class EditRouteMapComponent implements OnInit {
    constructor() {}
    private _trip: any;

    @Input() set trip(trip: any) {
        let orders: any = Object.values(trip.orders);
        let first: any = orders[0]["distributor"];

        let last: any = orders[orders.length - 1]["distributor"];
        this.origin = { lat: first.latitude, lng: first.longitude };
        this.destination = { lat: last.latitude, lng: last.longitude };
        console.log(first, last);
        this._trip = trip;
    }

    get trip() {
        return this._trip;
    }
    origin: any;
    waypoints: any;
    destination: any;

    ngOnInit() {}
}
