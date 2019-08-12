import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsRoutingModule } from './stats-routing.module';
import { StatsHomeComponent } from './stats-home/stats-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [StatsHomeComponent, DashboardComponent, SidebarComponent],
  imports: [
    CommonModule,
    StatsRoutingModule,
    HttpClientModule,
    ChartsModule
  ],
  exports: [ChartsModule]
})
export class StatsModule { }
