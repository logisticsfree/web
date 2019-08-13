import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth.guard';
import { BayhomeComponent } from './bayhome/bayhome.component';
import { TruckDetailsComponent } from './truck-details/truck-details.component';
import { DefaultViewComponent } from './default-view/default-view.component';


const routes: Routes = [

    {
        path: 'bay-operations',
        component: BayhomeComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: DefaultViewComponent,
                outlet: 'loadingbay'
            },
            {
                path: 'details',
                component: TruckDetailsComponent,
                outlet: 'loadingbay'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BayOperationsRoutingModule { }
