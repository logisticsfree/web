import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SkuComponent } from './sku/sku.component';
import { DatabaseHomeComponent } from './database-home/database-home.component';
import { AuthGuard } from 'src/app/core/auth.guard';
import { DistributorsComponent } from './distributors/distributors.component';
import { WarehousesComponent } from './warehouses/warehouses.component';
import { LoadingBayComponent } from './loading-bay/loading-bay.component';

const routes: Routes = [
    {
        path: 'database',
        component: DatabaseHomeComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: '/database/(database:skus)',
                pathMatch: 'full'
            },
            {
                path: 'skus',
                component: SkuComponent,
                outlet: 'database'
            },
            {
                path: 'distributors',
                component: DistributorsComponent,
                outlet: 'database'
            },
            {
                path: 'warehouses',
                component: WarehousesComponent,
                outlet: 'database'
            },
            {
                path: 'loading-bay',
                component: LoadingBayComponent,
                outlet: 'database'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DatabaseRoutingModule { }
