import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsHomeComponent } from './settings-home/settings-home.component';
import { AuthGuard } from 'src/app/core/auth.guard';
import { UserManagementComponent } from './user-management/user-management.component';

const routes: Routes = [{
  path: 'settings',
  component: SettingsHomeComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      redirectTo: '/settings/(settings:user-management)',
      pathMatch: 'full',
    },
    {
      path: 'user-management',
      component: UserManagementComponent,
      outlet: 'settings',
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
