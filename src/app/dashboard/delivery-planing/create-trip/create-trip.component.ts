import { Component, OnInit, ViewChild } from '@angular/core';
import { TruckService } from '../services/truck.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { OrderService } from '../services/order.service';
import {
    style,
    animate,
    transition,
    trigger,
    state
} from '@angular/animations';

@Component({
    selector: 'app-create-trip',
    templateUrl: './create-trip.component.html',
    styleUrls: ['./create-trip.component.scss'],
    animations: [
        trigger('slideInOutFromLeft', [
            transition(':enter', [
                style({ transform: 'translateX(100%)' }),
                animate('200ms ease-in', style({ transform: 'translateX(0%)' }))
            ]),
            transition(':leave', [
                animate(
                    '200ms ease-in',
                    style({ transform: 'translateX(100%)' })
                )
            ])
        ]),
        trigger('grow', [
            state(
                'open',
                style({
                    // overflow: 'hidden',
                    height: '*',
                    width: '*'
                })
            ),
            state(
                'close',
                style({
                    // opacity: '0',
                    // overflow: 'hidden',
                })
            ),
            transition('in <=> out', animate('400ms ease-in-out'))
        ])
    ]
})
export class CreateTripComponent implements OnInit {
    // TODO: fix animation

    trucks: any;

    constructor(
        private truckService: TruckService,
    ) { }

    ngOnInit() {
        this.truckService.getOrderedTrucks().subscribe(trucks => {
            this.trucks = trucks;
        });

    }

    // TODO : replace with firebase Function
    getTotalWeight(truck) {
        if (!truck.orders) return 0;
        let totalWeight = 0;
        Object.values(truck.orders).forEach(order => {
            totalWeight += parseFloat(order['weight']);
        });
        return totalWeight;
    }

    // TODO : replace with firebase Function
    getTotalVolume(truck) {
        if (!truck.orders) return 0;
        let totalVolume = 0;
        Object.values(truck.orders).forEach(order => {
            totalVolume += parseFloat(order['volume']);
        });
        return totalVolume;
    }

    getOrders(truck) {
        return truck.orders ? Object.values(truck.orders) : [];
    }
}
