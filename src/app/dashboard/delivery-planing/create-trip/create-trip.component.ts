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
    ordersTableDataSource: any;
    ordersColumnsToDisplay: string[] = [
        'invoice',
        'distributor',
        'volume',
        'weight',
        'actions'
    ];

    assignOrdersView: boolean = false;
    assignOrdersViewData: any = {};
    cardStatus: string = 'open';

    constructor(
        private truckService: TruckService,
        private orderService: OrderService
    ) {}

    @ViewChild('ordersPaginator') orderPaginator: MatPaginator;

    ngOnInit() {
        this.truckService.getOrderedTrucks().subscribe(trucks => {
            this.trucks = trucks;
        });

        this.fillTable();
    }

    assignOrder(truck, order) {
        order.status = 1;
        if (truck.orders) {
            truck.orders[order.invoice] = order;
        } else {
            truck.orders = { [order.invoice]: order };
        }
        truck.routed = false;

        if (order.status) this.orderService.setStatus(order, order.status);
        else this.orderService.setStatus(order, 0);

        this.truckService.saveOrderedTruck(truck);
    }

    showAssignOrdersView(truck) {
        if (this.assignOrdersView) {
            this.assignOrdersView = false;
            delete this.assignOrdersViewData[truck.truck.vid];
        } else {
            this.assignOrdersView = true;
            this.assignOrdersViewData[truck.truck.vid] = truck;
        }
        this.toggleCardStats();
    }

    applyOrderFilter(filterValue: string) {
        this.ordersTableDataSource.filter = filterValue.trim().toLowerCase();
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

    fillTable() {
        const unsubscribe = this.orderService.getOrders().subscribe(orders => {
            let pendingOrders = Object.values(orders).filter(order =>
                order['status'] ? null : order
            );
            this.ordersTableDataSource = new MatTableDataSource(pendingOrders);

            setTimeout(() => {
                this.ordersTableDataSource.paginator = this.orderPaginator;
            });
        });
    }

    toggleCardStats() {
        this.cardStatus = this.cardStatus === 'open' ? 'close' : 'open';
    }

    getOrders(truck) {
        return truck.orders ? Object.values(truck.orders) : [];
    }
}
