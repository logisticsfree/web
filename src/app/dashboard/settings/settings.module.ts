import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { UserManagementComponent } from './user-management/user-management.component';
import { SettingsHomeComponent } from './settings-home/settings-home.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [UserManagementComponent, SettingsHomeComponent, SidebarComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
