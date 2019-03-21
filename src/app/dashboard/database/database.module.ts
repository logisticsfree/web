import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkuComponent } from './sku/sku.component';
import { DatabaseRoutingModule } from './database-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DatabaseHomeComponent } from './database-home/database-home.component';

import { MatTableModule, MatPaginatorModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { DistributorsComponent } from './distributors/distributors.component';

@NgModule({
  declarations: [
    SkuComponent,
    SidebarComponent,
    DatabaseHomeComponent,
    DistributorsComponent
  ],
  imports: [
    CommonModule,
    DatabaseRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule
  ]
})
export class DatabaseModule {}
