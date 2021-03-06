import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import {
    trigger,
    state,
    style,
    transition,
    animate,
    keyframes
} from '@angular/animations';
import { Order } from 'src/app/models/Order';
import { TruckService } from '../services/truck.service';
import { OrderService } from '../services/order.service';

@Component({
    selector: 'app-assigned-orders-table',
    templateUrl: './assigned-orders-table.component.html',
    styleUrls: ['./assigned-orders-table.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
            state('expanded', style({ height: '*' })),
            transition('collapsed <=> expanded', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ])
    ]
})
export class AssignedOrdersTableComponent implements OnInit {
    columnsToDisplay: string[] = [
        'invoice',
        'distributor',
        'volume',
        'weight',
        'actions'
    ];
    expandedElement: Order | null;
    dataSource: any;
    private _orders: any;

    @ViewChild('paginator') paginator: MatPaginator;

    @Input() truck: any;
    @Input() set orders(orders: any[]) {
        this._orders = orders;
        this.dataSource = new MatTableDataSource(orders);
        // console.log(this.orders);
    }
    get orders() {
        return this._orders;
    }

    constructor(
        private orderService: OrderService,
        private truckService: TruckService
    ) { }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
    }

    splitOrder(order) {
        this.truckService.updateOrders(this.truck.tripID, { [order.invoice]: order })
    }
    unassignOrder(truck, order) {
        order.status = 0;

        if (order.status) this.orderService.setStatus(order, order.status);
        else this.orderService.setStatus(order, 0);

        this.truckService.removeOrder(truck, order);
    }

    applyOrderFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        console.log(filterValue, this.dataSource);
    }

    fillTable() {
        const unsubscribe = this.orderService.getOrders().subscribe(orders => {
            let pendingOrders = Object.values(orders).filter(order =>
                order['status'] ? null : order
            );
            console.log(pendingOrders);
            this.dataSource = new MatTableDataSource(pendingOrders);

            setTimeout(() => {
                this.dataSource.paginator = this.paginator;
            });
        });
    }
}
