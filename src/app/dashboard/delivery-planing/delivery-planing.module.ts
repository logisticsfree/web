import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DeliveryPlaningRoutingModule } from './delivery-planing-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DeliveryHomeComponent } from './delivery-home/delivery-home.component';
import { CreateTripComponent } from './create-trip/create-trip.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
} from '@angular/material';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AssignSkusComponent } from './assign-skus/assign-skus.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DriverCardComponent } from 'src/app/common/driver-card/driver-card.component';
import { EditRouteComponent } from './edit-route/edit-route.component';
import { EditRouteMapComponent } from './edit-route-map/edit-route-map.component';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { environment } from 'src/environments/environment.prod';
import { SharedModule } from 'src/app/common/shared/shared.module';
import {
    AssignedOrdersTableComponent
} from './assigned-orders-table/assigned-orders-table.component';
import { SplitOrderComponent } from './split-order/split-order.component';
import { SplitOrderFormComponent } from './split-order-form/split-order-form.component';
import { AssignOrdersViewComponent } from './assign-orders-view/assign-orders-view.component';
import { PendingOrdersTableComponent } from './pending-orders-table/pending-orders-table.component';

@NgModule({
    declarations: [
        OrdersComponent,
        SidebarComponent,
        DeliveryHomeComponent,
        CreateTripComponent,
        AssignSkusComponent,
        EditRouteComponent,
        EditRouteMapComponent,
        AssignedOrdersTableComponent,
        SplitOrderComponent,
        SplitOrderFormComponent,
        AssignOrdersViewComponent,
        PendingOrdersTableComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        DeliveryPlaningRoutingModule,
        NgxPaginationModule,
        SatPopoverModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        DragDropModule,
        AgmCoreModule.forRoot({
            apiKey: environment.firebase.apiKey
        }),
        AgmDirectionModule
    ],
})
export class DeliveryPlaningModule { }
