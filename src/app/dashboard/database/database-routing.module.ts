import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SkuComponent } from './sku/sku.component';
import { DatabaseHomeComponent } from './database-home/database-home.component';
import { AuthGuard } from 'src/app/core/auth.guard';
import { DistributorsComponent } from './distributors/distributors.component';

const routes: Routes = [
    {
        path: 'database',
        component: DatabaseHomeComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'skus',
                pathMatch: 'full'
                // component: SkuComponent,
                // outlet: 'database'
            },
            {
                path: 'skus',
                component: SkuComponent
                // outlet: 'database'
            },
            {
                path: 'distributors',
                component: DistributorsComponent,
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
