import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { OrderService } from '../services/order.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { TruckService } from '../services/truck.service';

@Component({
  selector: 'app-pending-orders-table',
  templateUrl: './pending-orders-table.component.html',
  styleUrls: ['./pending-orders-table.component.scss']
})
export class PendingOrdersTableComponent implements OnInit {
  dataSource: any;
  columnsToDisplay: string[] = [
    'invoice',
    'distributor',
    'volume',
    'weight',
    'actions'
  ];

  constructor(private orderService: OrderService,
    private truckService: TruckService) { }

  @ViewChild('paginator') paginator: MatPaginator;
  @Input() truck: any;

  ngOnInit() {
    this.fillTable();
  }

  assignOrder(truck: any, order: any) {
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

  fillTable() {
    this.orderService.getOrders().subscribe(orders => {
      let pendingOrders = Object.values(orders).filter(order =>
        order['status'] ? null : order
      );
      this.dataSource = new MatTableDataSource(pendingOrders);

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue, this.dataSource);
  }
}
