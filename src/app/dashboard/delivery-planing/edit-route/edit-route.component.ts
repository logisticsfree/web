import { Component, OnInit } from "@angular/core";
import { TruckService } from "../services/truck.service";

@Component({
    selector: "app-edit-route",
    templateUrl: "./edit-route.component.html",
    styleUrls: ["./edit-route.component.scss"]
})
export class EditRouteComponent implements OnInit {
    trucks: any;
    get trucksWithOrders() {
        return this.trucks.filter(truck => {
            if (
                Object.keys(truck["orders"]).length === 0 &&
                truck["orders"].constructor === Object
            ) {
                return null;
            } else {
                return truck;
            }
        });
	}
	
    selectedTrip: any;

    constructor(private truckService: TruckService) {}

    ngOnInit() {
        this.truckService.getOrderedTrucks().subscribe(trucks => {
            this.trucks = Object.values(trucks);
        });
    }

    selectTrip(truck) {
        this.selectedTrip = truck;
        console.log(this.selectedTrip);
    }

    // TODO : replace with firebase Function
    getTotalWeight(truck) {
        // this.selectedTrip = truck;
        if (!truck.orders) return 0;
        let totalWeight = 0;
        Object.values(truck.orders).forEach(order => {
            totalWeight += parseFloat(order["weight"]);
        });
        return totalWeight;
    }

    // TODO : replace with firebase Function
    getTotalVolume(truck) {
        if (!truck.orders) return 0;
        let totalVolume = 0;
        Object.values(truck.orders).forEach(order => {
            totalVolume += parseFloat(order["volume"]);
        });
        return totalVolume;
    }
}
