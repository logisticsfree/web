import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverCardComponent } from '../driver-card/driver-card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DriverCardComponent],
  exports: [DriverCardComponent]
})
export class SharedModule { }
