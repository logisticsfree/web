import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DeliveryPlaningRoutingModule } from "./delivery-planing-routing.module";
import { OrdersComponent } from "./orders/orders.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { DeliveryHomeComponent } from "./delivery-home/delivery-home.component";
import { CreateTripComponent } from "./create-trip/create-trip.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatTableModule, MatPaginatorModule } from "@angular/material";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { AssignSkusComponent } from "./assign-skus/assign-skus.component";
import { DriverCardComponent } from "src/app/partials/driver-card/driver-card.component";
import { EditRouteComponent } from "./edit-route/edit-route.component";
import { EditRouteMapComponent } from "./edit-route-map/edit-route-map.component";
import { AgmCoreModule } from "@agm/core";
import { AgmDirectionModule } from "agm-direction";
import { environment } from "src/environments/environment.prod";

@NgModule({
    declarations: [
        OrdersComponent,
        SidebarComponent,
        DeliveryHomeComponent,
        CreateTripComponent,
        AssignSkusComponent,
        DriverCardComponent,
        EditRouteComponent,
        EditRouteMapComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DeliveryPlaningRoutingModule,
        MatTableModule,
        MatPaginatorModule,
        DragDropModule,
        AgmCoreModule.forRoot({
            apiKey: environment.firebase.apiKey
        }),
        AgmDirectionModule
    ]
})
export class DeliveryPlaningModule {}
