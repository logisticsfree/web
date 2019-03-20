import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SkuComponent } from './sku/sku.component';
import { DatabaseHomeComponent } from './database-home/database-home.component';

const routes: Routes = [
  {
    path: 'database',
    component: DatabaseHomeComponent,
    children: [
      {
        path: 'skus',
        component: SkuComponent,
        outlet: 'database'
      },
      {
        path: '',
        component: SkuComponent,
        outlet: 'database'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatabaseRoutingModule {}
