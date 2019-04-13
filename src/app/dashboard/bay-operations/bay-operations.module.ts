import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BayOperationsRoutingModule } from './bay-operations-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoadingbayComponent } from './loadingbay/loadingbay.component';
import { BayhomeComponent } from './bayhome/bayhome.component';
import { MatTableModule, MatPaginatorModule } from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SidebarComponent, LoadingbayComponent, BayhomeComponent],
  imports: [
    CommonModule,
    BayOperationsRoutingModule,
    MatTableModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        AgmCoreModule.forRoot({
            apiKey: environment.firebase.apiKey
        })
  ]
})
export class BayOperationsModule { }
