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
import { NavbarComponent } from './partials/navbar/navbar.component';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { FooterComponent } from './partials/footer/footer.component';
import { UserComponent } from './user/user.component';
import { AuthService } from './core/auth.service';
import { CoreModule } from './core/core.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TestComponent } from './test/test.component';
import { DatabaseModule } from './dashboard/database/database.module';
import { DeliveryPlaningModule } from './dashboard/delivery-planing/delivery-planing.module';
import { VehicleProcurementModule } from './dashboard/vehicle-procurement/vehicle-procurement.module';
//import { OrderService } from '../services/order.service';




@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavbarComponent,
        LoginComponent,
        RegisterComponent,
        FooterComponent,
        UserComponent,
        PageNotFoundComponent,
        TestComponent,
        
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        DatabaseModule,
        VehicleProcurementModule,
        DeliveryPlaningModule,
        AppRoutingModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        // AngularFireAuthModule,
        NgxSpinnerModule,
        CoreModule
    ],
    providers: [{ provide: FirestoreSettingsToken, useValue: {} }],
    bootstrap: [AppComponent]
})
export class AppModule {}
