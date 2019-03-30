import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryPlaningRoutingModule } from './delivery-planing-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DeliveryHomeComponent } from './delivery-home/delivery-home.component';
import { CreateTripComponent } from './create-trip/create-trip.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatPaginatorModule } from '@angular/material';
import { AssignSkusComponent } from './assign-skus/assign-skus.component';

@NgModule({
    declarations: [
        OrdersComponent,
        SidebarComponent,
        DeliveryHomeComponent,
        CreateTripComponent,
        AssignSkusComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DeliveryPlaningRoutingModule,
        MatTableModule,
        MatPaginatorModule
    ]
})
export class DeliveryPlaningModule {}
