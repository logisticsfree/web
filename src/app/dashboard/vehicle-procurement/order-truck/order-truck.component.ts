import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Warehouse } from 'src/app/models/Warehouse';
import { NavbarService } from 'src/app/services/navbar.service';
import { GeofireService } from 'src/app/services/geofire.service';

interface location {
    lat: number;
    lng: number;
    name?: string;
}

@Component({
    selector: 'app-order-truck',
    templateUrl: './order-truck.component.html',
    styleUrls: ['./order-truck.component.scss']
})

export class OrderTruckComponent implements OnInit {
    warehouse: Warehouse;
    nearbyTrucks: location[];
    toggleOrderVehicle: boolean = false;
    icon = {
        url: './assets/truck-solid.svg',
        scaledSize: {
            width: 25,
            height: 40
        }
    };

    constructor(
        private navbarService: NavbarService,
        private gfs: GeofireService
    ) { }

    ngOnInit() {
        this.navbarService.getWarehouse().subscribe(warehouse => {
            this.warehouse = warehouse;
            this.getNearbyTrucks();
        });
    }

    getNearbyTrucks() {
        if (!this.warehouse) return;

        const center = [this.warehouse.latitude, this.warehouse.longitude];
        this.gfs.getDriversWithinRadius(center, 70);

        this.gfs.trucks.subscribe(trucks => {
            this.nearbyTrucks = trucks.map<location>(truck => {
                return {
                    lat: truck.location[0],
                    lng: truck.location[1],
                };
            })
            console.log(this.nearbyTrucks);

        })
    }

    toggleOrderVehicleModal() {
        this.toggleOrderVehicle = true;
    }

}
