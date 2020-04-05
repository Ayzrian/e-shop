import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductComponent} from './product.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule
  ]
})
export class ProductModule {
}
