import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleProcurementHomeComponent } from './vehicle-procurement-home/vehicle-procurement-home.component';
import { AuthGuard } from 'src/app/core/auth.guard';
import { OrderComponent } from './order/order.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { OrderTruckComponent } from './order-truck/order-truck.component';
import { HistoryComponent } from './history/history.component';
import {SkuComponent} from '../database/sku/sku.component';
import { OrderSpecificVeficleComponent } from './order-specific-veficle/order-specific-veficle.component';
import { OrderVehicleComponent } from './order-vehicle/order-vehicle.component';
const routes: Routes = [
{
    path: 'vehicle-procurement',
    component: VehicleProcurementHomeComponent,
    canActivate: [AuthGuard],
    children: [
    {
        path: '',
        component: OrderTruckComponent,
        outlet: 'procurement'
      },
      
      {
        path: 'orders',
        component: OrderComponent,
        outlet: 'procurement'
      },
      {
        path: 'order-truck',
        component: OrderTruckComponent,
        outlet: 'procurement'
      },
      {
        path: 'history',
        component: HistoryComponent,
        outlet: 'procurement'
      },
      {
        path :'order-specific-veficle',
        component:OrderSpecificVeficleComponent,
        outlet: 'procurement'

      },
      {
        path :'order-vehicle',
        component:OrderVehicleComponent,
        outlet: 'procurement'

      }

      
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleProcurementRoutingModule { }
