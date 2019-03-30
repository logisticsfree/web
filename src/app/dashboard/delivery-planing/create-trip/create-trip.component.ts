import { Component, OnInit, ViewChild } from '@angular/core';
import { TruckService } from '../services/truck.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { OrderService } from '../services/order.service';

@Component({
    selector: 'app-create-trip',
    templateUrl: './create-trip.component.html',
    styleUrls: ['./create-trip.component.scss']
})
export class CreateTripComponent implements OnInit {

    trucks: any;
    ordersTableDataSource: any;
    ordersColumnsToDisplay: string[] = [
        'invoice',
        'distributor',
        'volume',
        'weight',
        'value',
        'actions'
    ];

    assignOrdersView: boolean = false;
    assignOrdersViewData: any = {};

    constructor(private truckService: TruckService, private orderService: OrderService) { }

    @ViewChild('ordersPaginator') orderPaginator: MatPaginator;

    ngOnInit() {
        this.truckService.getOrderedTrucks().subscribe(trucks => {
            this.trucks = Object.values(trucks);
        })

        this.fillTable();

    }
    saveOrders(truck) {
        this.truckService.saveOrderedTruck(truck).then(res => {
            this.showAssignOrdersView(truck);
        }
        );
    }
    unassignOrder(truck, order) {
        order.status = 0;
        let updatedData = this.ordersTableDataSource.data;
        updatedData.push(order);

        if (order.status)
            this.orderService.setStatus(order, order.status);
        else
            this.orderService.setStatus(order, 0);

        delete truck.orders[order.invoice];
    }
    assignOrder(truck, order) {
        order.status = 1;
        if (truck.orders) {
            truck.orders[order.invoice] = order;
        } else {
            truck.orders = { [order.invoice]: order };
        }

        let updatedData = this.ordersTableDataSource.data;

        for (let i = 0; i < updatedData.length; i++) {
            if (updatedData[i].invoice == order.invoice) {
                updatedData.splice(i, 1);
            }
        }

        if (order.status)
            this.orderService.setStatus(order, order.status);
        else
            this.orderService.setStatus(order, 0);

    }

    showAssignOrdersView(truck) {
        if (this.assignOrdersView) {
            this.assignOrdersView = false;
            delete this.assignOrdersViewData[truck.truck.vid];
        } else {
            this.assignOrdersView = true;
            this.assignOrdersViewData[truck.truck.vid] = truck;
        }
    }

    applyOrderFilter(filterValue: string) {
        this.ordersTableDataSource.filter = filterValue.trim().toLowerCase();
    }

    fillTable() {
        const unsubscribe = this.orderService.getOrders().subscribe(orders => {
            let pendingOrders = Object.values(orders).filter(order => order.status ? null : order);
            this.ordersTableDataSource = new MatTableDataSource(pendingOrders);

            setTimeout(() => {
                this.ordersTableDataSource.paginator = this.orderPaginator;
            });

            // unsubscribe.unsubscribe();

        });

    }

    getOrders(truck) {
        return truck.orders ? Object.values(truck.orders) : []
    }

}
