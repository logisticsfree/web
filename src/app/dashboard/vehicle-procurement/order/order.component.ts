import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from 'src/app/models/Order';
import { TruckService } from '../services/truck.service';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
    orders: Order[];
    toggleMapView: boolean;
    selectedTruck: any;

    constructor(
        private orderService: OrderService,
        private truckService: TruckService) { }

    ngOnInit() {
        this.orderService.getOrders().subscribe(orders => {
            let allOrders: Order[] = Object.values(orders);
            this.orders = allOrders.filter(order => !order.status);
        });
    }

    viewLocation(truck: Truck) {
        this.selectedTruck = truck;
        this.toggleMapView = true;
        this.truckService.getLocation(truck.truck.uid).subscribe(location => {
            this.selectedTruck.location = {
                lat: location[0],
                lng: location[1]
            };
        });
    }
}
