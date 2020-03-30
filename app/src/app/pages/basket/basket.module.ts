import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';



@NgModule({
  declarations: [BasketComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule
  ]
})
export class BasketModule { }
