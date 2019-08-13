import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryTrackingRoutingModule } from './delivery-tracking-routing.module';
import { TrackingHomeComponent } from './tracking-home/tracking-home.component';
import { ProcessingDeliveryComponent } from './processing-delivery/processing-delivery.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { TruckLocationMapComponent } from './truck-location-map/truck-location-map.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { AgmDirectionModule } from 'agm-direction';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HistoryComponent } from './history/history.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    TrackingHomeComponent,
    ProcessingDeliveryComponent,
    SidebarComponent,
    TripDetailsComponent,
    TruckLocationMapComponent,
    HistoryComponent
  ],
  imports: [
    CommonModule,
    DeliveryTrackingRoutingModule,
    NgxPaginationModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: environment.firebase.apiKey
    }),
    AgmDirectionModule,
    DragDropModule
  ]
})
export class DeliveryTrackingModule { }
