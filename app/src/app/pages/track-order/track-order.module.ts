import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TrackOrderComponent} from './track-order.component';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';



@NgModule({
  declarations: [TrackOrderComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule
  ],
  exports: [TrackOrderComponent]
})
export class TrackOrderModule { }
