import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseModule } from './database/database.module';
import { VehicleProcurementModule } from './vehicle-procurement/vehicle-procurement.module';
import { DeliveryPlaningModule } from './delivery-planing/delivery-planing.module';
import { SharedModule } from '../common/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    DatabaseModule,
    VehicleProcurementModule,
    DeliveryPlaningModule,
    VehicleProcurementModule,
  ],
  exports: []
})
export class DashboardModule { }
