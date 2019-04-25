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
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('collapsed <=> expanded', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class AssignedOrdersTableComponent implements OnInit {
    ordersColumnsToDisplay: string[] = [
        'invoice',
        'distributor',
        'volume',
        'weight',
        'actions'
    ];
    expandedElement: Order | null;
    ordersTableDataSource: any;
    private _orders: any;

    @ViewChild('assignedOrdersPaginator') orderPaginator: MatPaginator;

    @Input() truck: any;
    @Input() set orders(orders: any[]) {
        this._orders = orders;
        this.ordersTableDataSource = new MatTableDataSource(orders);
        // this.ordersTableDataSource.paginator = this.orderPaginator;
        
    }
    get orders() {
        return this._orders;
    }

    constructor(
        private orderService: OrderService,
        private truckService: TruckService
        ) {}

    ngOnInit() {
        // this.fillTable();

    }
    updateOrder(order) {
        console.log('order', this.truck);
        this.truckService.updateOrders(this.truck.truck.uid, {[order.invoice]: order})
    }
    unassignOrder(truck, order) {
        order.status = 0;

        if (order.status) this.orderService.setStatus(order, order.status);
        else this.orderService.setStatus(order, 0);

        this.truckService.removeOrder(truck, order);
    }

    applyOrderFilter(filterValue: string) {
        console.log(filterValue, this.ordersTableDataSource);
        this.ordersTableDataSource.filter = filterValue.trim().toLowerCase();
    }

    fillTable() {
        const unsubscribe = this.orderService.getOrders().subscribe(orders => {
            let pendingOrders = Object.values(orders).filter(order =>
                order['status'] ? null : order
            );
            console.log(pendingOrders);
            this.ordersTableDataSource = new MatTableDataSource(pendingOrders);

            setTimeout(() => {
                this.ordersTableDataSource.paginator = this.orderPaginator;
            });
        });
    }
}
