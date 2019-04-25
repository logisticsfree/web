import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
import { BayOperationsModule } from './dashboard/bay-operations/bay-operations.module';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { DashboardModule } from './dashboard/dashboard.module';

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
        FormsModule,
        DashboardModule,
        CoreModule,
        DatabaseModule,
        VehicleProcurementModule,
        DeliveryPlaningModule,
        BayOperationsModule,
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
