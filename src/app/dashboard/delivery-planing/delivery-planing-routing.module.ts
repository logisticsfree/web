import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DeliveryHomeComponent } from "./delivery-home/delivery-home.component";
import { AuthGuard } from "src/app/core/auth.guard";
import { OrdersComponent } from "./orders/orders.component";
import { CreateTripComponent } from "./create-trip/create-trip.component";
import { AssignSkusComponent } from "./assign-skus/assign-skus.component";
import { EditRouteComponent } from "./edit-route/edit-route.component";

const routes: Routes = [
    {
        path: "delivery-planing",
        component: DeliveryHomeComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: '/delivery-planing/(delivery:orders)',
                pathMatch: 'full'
            },
            {
                path: "orders",
                component: OrdersComponent,
                outlet: "delivery",
                children: [
                    {
                        path: ":id",
                        component: AssignSkusComponent
                    }
                ]
            },
            {
                path: "create-trip",
                component: CreateTripComponent,
                outlet: "delivery"
            },
            {
                path: "edit-route",
                component: EditRouteComponent,
                outlet: "delivery"
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeliveryPlaningRoutingModule { }
