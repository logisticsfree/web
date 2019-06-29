import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BayOperationsRoutingModule } from './bay-operations-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoadingbayComponent } from './loadingbay/loadingbay.component';
import { BayhomeComponent } from './bayhome/bayhome.component';
import { MatTableModule, MatPaginatorModule } from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TruckListComponent } from './truck-list/truck-list.component';
import { TruckDetailsComponent } from './truck-details/truck-details.component';
import { DefaultViewComponent } from './default-view/default-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [SidebarComponent, LoadingbayComponent, BayhomeComponent, TruckListComponent, TruckDetailsComponent, DefaultViewComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BayOperationsRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.firebase.apiKey
    })
  ]
})
export class BayOperationsModule { }
