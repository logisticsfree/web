import { NgModule } from '@angular/core';

import { AuthService } from './auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthGuard } from './auth.guard';
import { GuestGuard } from './guest.guard';

@NgModule({
  imports: [AngularFireAuthModule, AngularFirestoreModule],
  providers: [AuthService, AuthGuard, GuestGuard]
})
export class CoreModule {}
