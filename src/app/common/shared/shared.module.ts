import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DriverCardComponent } from '../driver-card/driver-card.component';
import { EditFormPopupComponent } from '../edit-form-popup/edit-form-popup.component';

import { 
    MatTableModule, 
    MatPaginatorModule,
    MatFormFieldModule, 
    MatInputModule, } from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  declarations: [DriverCardComponent, EditFormPopupComponent],
  exports: [DriverCardComponent, EditFormPopupComponent]
})
export class SharedModule { }
