import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatabaseRoutingModule } from './database-routing.module';

import { MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { AgmCoreModule } from '@agm/core';

import { SharedModule } from 'src/app/common/shared/shared.module';
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
        SharedModule,
        SatPopoverModule,
        DatabaseRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        FormsModule,
        ReactiveFormsModule,
        AgmCoreModule.forRoot({
            apiKey: environment.firebase.apiKey
        })
    ]
})
export class DatabaseModule {}
