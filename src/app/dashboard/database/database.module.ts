import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DatabaseRoutingModule } from './database-routing.module';

import { MatTableModule, MatPaginatorModule } from '@angular/material';
import { AgmCoreModule } from '@agm/core';

import { SkuComponent } from './sku/sku.component';
import { environment } from 'src/environments/environment';
import { SidebarComponent } from './sidebar/sidebar.component';
import { WarehousesComponent } from './warehouses/warehouses.component';
import { DistributorsComponent } from './distributors/distributors.component';
import { DatabaseHomeComponent } from './database-home/database-home.component';

@NgModule({
    declarations: [
        SkuComponent,
        SidebarComponent,
        DatabaseHomeComponent,
        DistributorsComponent,
        WarehousesComponent
    ],
    imports: [
        CommonModule,
        DatabaseRoutingModule,
        MatTableModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        AgmCoreModule.forRoot({
            apiKey: environment.firebase.apiKey
        })
    ]
})
export class DatabaseModule {}
