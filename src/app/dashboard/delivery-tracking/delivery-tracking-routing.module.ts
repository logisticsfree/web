import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrackingHomeComponent } from './tracking-home/tracking-home.component';
import { AuthGuard } from 'src/app/core/auth.guard';
import { ProcessingDeliveryComponent } from './processing-delivery/processing-delivery.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  {
    path: 'delivery-tracking',
    component: TrackingHomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/delivery-tracking/(tracking:processing)',
        pathMatch: 'full'
      },
      {
        path: 'trip-details',
        component: TripDetailsComponent,
        outlet: 'tracking'
      },
      {
        path: 'processing',
        component: ProcessingDeliveryComponent,
        outlet: 'tracking'
      },
      {
        path: 'history',
        component: HistoryComponent,
        outlet: 'tracking'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryTrackingRoutingModule { }
