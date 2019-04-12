import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Warehouse } from 'src/app/models/Warehouse';
import { WarehouseService } from '../../database/services/warehouse.service';
@Component({
  selector: 'app-order-truck',
  templateUrl: './order-truck.component.html',
  styleUrls: ['./order-truck.component.scss']
})

export class OrderTruckComponent implements OnInit {

  warehouses: Warehouse[];
  selectedWarehouse: Warehouse;

  toggleOrderVehicle: boolean = false;

  constructor(private router: Router, private warehouseService: WarehouseService) { }

  ngOnInit() {
    const uns = this.warehouseService
      .getWarehouses()
      .subscribe(warehouses => {
        this.warehouses = Object.values(warehouses);
        // TODO: fix if there's no warehouses added
        // redirect to database/warehouse to add some
        this.selectedWarehouse = this.warehouses[0];
        uns.unsubscribe();
      });
  }

  toggleOrderVehicleModal () {
    this.toggleOrderVehicle = true;
  }

}
