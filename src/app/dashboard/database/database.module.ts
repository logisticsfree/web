import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatabaseRoutingModule } from './database-routing.module';

import {
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule
} from '@angular/material';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { AgmCoreModule } from '@agm/core';

import { SharedModule } from 'src/app/common/shared/shared.module';
import { SkuComponent } from './sku/sku.component';
import { environment } from 'src/environments/environment';
import { SidebarComponent } from './sidebar/sidebar.component';
import { WarehousesComponent } from './warehouses/warehouses.component';
import { DistributorsComponent } from './distributors/distributors.component';
import { DatabaseHomeComponent } from './database-home/database-home.component';
import { LoadingBayComponent } from './loading-bay/loading-bay.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingOfficersComponent } from './loading-officers/loading-officers.component';
import { LoadingOfficersTableRowComponent } from './loading-officers-table-row/loading-officers-table-row.component';

@NgModule({
    declarations: [
        SkuComponent,
        SidebarComponent,
        DatabaseHomeComponent,
        DistributorsComponent,
        WarehousesComponent,
        LoadingBayComponent,
        LoadingOfficersComponent,
        LoadingOfficersTableRowComponent
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        SatPopoverModule,
        DatabaseRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        AgmCoreModule.forRoot({
            apiKey: environment.firebase.apiKey
        })
    ]
})
export class DatabaseModule { }
