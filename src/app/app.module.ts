import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import {
    AngularFirestoreModule,
    FirestoreSettingsToken
} from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { FooterComponent } from './common/footer/footer.component';
import { UserComponent } from './user/user.component';
import { AuthService } from './core/auth.service';
import { SkuService } from './dashboard/database/services/sku.service';
import { CoreModule } from './core/core.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TestComponent } from './test/test.component';
import { DatabaseModule } from './dashboard/database/database.module';
import { DeliveryPlaningModule } from './dashboard/delivery-planing/delivery-planing.module';
import { VehicleProcurementModule } from './dashboard/vehicle-procurement/vehicle-procurement.module';
<<<<<<< HEAD
import { BayOperationsModule } from './dashboard/bay-operations/bay-operations.module';
=======
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { DriverCardComponent } from './common/driver-card/driver-card.component';
import { DashboardModule } from './dashboard/dashboard.module';
>>>>>>> 6abda702f9500e55d610372309396ed77000f654
//import { OrderService } from '../services/order.service';
//import { AlertModule } from 'ngx-bootstrap';




@NgModule({
    declarations: [
        // DriverCardComponent,
        AppComponent,
        HomeComponent,
        NavbarComponent,
        FooterComponent,
        UserComponent,
        PageNotFoundComponent,
        TestComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        DashboardModule,
        CoreModule,
<<<<<<< HEAD
        DatabaseModule,
        VehicleProcurementModule,
        DeliveryPlaningModule,
        BayOperationsModule,
=======
>>>>>>> 6abda702f9500e55d610372309396ed77000f654
        AppRoutingModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFirestoreModule,
        // AngularFireAuthModule,
        NgxSpinnerModule,
        CoreModule
        //AlertModule.forRoot()
    ],
    providers: [{ provide: FirestoreSettingsToken, useValue: {}}, SkuService],
    bootstrap: [AppComponent]
})
export class AppModule { }
