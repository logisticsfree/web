import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleProcurementRoutingModule } from './vehicle-procurement-routing.module';
import { MatTableModule, MatPaginatorModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { VehicleProcurementHomeComponent } from './vehicle-procurement-home/vehicle-procurement-home.component';
import { AgmCoreModule } from '@agm/core';
import { OrderComponent } from './order/order.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { OrderTruckComponent } from './order-truck/order-truck.component';
import { HistoryComponent } from './history/history.component';
import { OrderSpecificVeficleComponent } from './order-specific-veficle/order-specific-veficle.component';
import { OrderVehicleComponent } from './order-vehicle/order-vehicle.component';
import { ShowOrderMapComponent } from './show-order-map/show-order-map.component';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        VehicleProcurementHomeComponent,
        OrderComponent,
        SidebarComponent,
        OrderTruckComponent,
        HistoryComponent,
        OrderSpecificVeficleComponent,
        OrderVehicleComponent,
        ShowOrderMapComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        SharedModule,
        VehicleProcurementRoutingModule,
        MatTableModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        AgmCoreModule.forRoot({
            apiKey: environment.firebase.apiKey
        })]
})
export class VehicleProcurementModule { }
