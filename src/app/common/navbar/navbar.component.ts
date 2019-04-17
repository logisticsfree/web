import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Warehouse } from 'src/app/models/Warehouse';
import { NavbarService } from 'src/app/services/navbar.service';
import { WarehouseService } from 'src/app/dashboard/database/services/warehouse.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    user: any;
    activePreload = true;
    activeNavbar = false;
    routerLinkOptions = { exact: true };
    selectedWarehouse: Warehouse;
    warehouses: Warehouse[];

    constructor(
        public authService: AuthService,
        public mAuth: AngularFireAuth,
        private warehouseService: WarehouseService,
        private navbarService: NavbarService
    ) { }

    ngOnInit() {
        this.authService.afAuth.authState.subscribe(user => {
            this.user = user;
            this.activePreload = false;
        });

        const uns = this.warehouseService
            .getWarehouses()
            .subscribe(warehouses => {
                this.warehouses = Object.values(warehouses);
                // TODO: fix if there's no warehouses added
                // redirect to database/warehouse to add some
                this.selectedWarehouse = this.warehouses[0];
                
                // get users warehouse & set it in navbar
                this.navbarService.getWarehouse().subscribe(warehouse => {
                    this.selectedWarehouse = this.warehouses
                        .filter(w => w.name === warehouse.name)[0];
                });
                uns.unsubscribe();
            });
    }

    saveWarehouse() {
        if (!this.selectedWarehouse.name) return;
        this.navbarService.setWarehouse(this.selectedWarehouse);
    }

    userStatus() {
        const uns = this.authService.afAuth.authState.subscribe(val => {
            console.log('authState', val);
            uns.unsubscribe();
        });
    }

    toggleNavbar() {
        this.activeNavbar = !this.activeNavbar;
    }
    tryLogout() {
        this.authService.signOut();
    }
}
