import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DriverCardComponent } from '../driver-card/driver-card.component';
import { EditFormPopupComponent } from '../edit-form-popup/edit-form-popup.component';

import {
  MatTableModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
} from '@angular/material';
import {
  PaginationControllerComponent
} from '../pagination-controller/pagination-controller.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../filter.pipe';
import { PlaceholderPostComponent } from '../placeholder-post/placeholder-post.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    NgxPaginationModule,
  ],
  declarations: [
    DriverCardComponent,
    EditFormPopupComponent,
    PaginationControllerComponent,
    PlaceholderPostComponent,
    FilterPipe,
  ],

  exports: [
    DriverCardComponent,
    EditFormPopupComponent,
    PaginationControllerComponent,
    PlaceholderPostComponent,
    FilterPipe,
  ]
})
export class SharedModule { }
