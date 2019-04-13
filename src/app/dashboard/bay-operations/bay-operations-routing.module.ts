import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth.guard';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoadingbayComponent } from './loadingbay/loadingbay.component';
import { BayhomeComponent } from './bayhome/bayhome.component';


const routes: Routes = [

{
	    path: 'bay-operations',
        component: BayhomeComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: " ",
                // redirectTo: 'skus',
                // pathMatch: 'full'
                component: LoadingbayComponent,
                outlet: 'loadingbay'
            },
            {
                path: 'loadingbay',
                component: LoadingbayComponent,
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
