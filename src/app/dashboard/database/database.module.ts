import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkuComponent } from './sku/sku.component';
import { DatabaseRoutingModule } from './database-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DatabaseHomeComponent } from './database-home/database-home.component';

import { MatTableModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SkuComponent, SidebarComponent, DatabaseHomeComponent],
  imports: [
    CommonModule,
    DatabaseRoutingModule,
    MatTableModule,
    ReactiveFormsModule
  ]
})
export class DatabaseModule {}
