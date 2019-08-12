import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatsHomeComponent } from './stats-home/stats-home.component';

const routes: Routes = [
  {
    path: 'stats',
    component: StatsHomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/stats/(stats:dashboard)',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        outlet: 'stats'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatsRoutingModule { }
