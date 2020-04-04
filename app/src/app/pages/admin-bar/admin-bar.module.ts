import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBarComponent } from './admin-bar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { NewProductComponent } from './new-product/new-product.component';
import { StatisticsComponent } from './statistics/statistics.component';
import {AdminBarRoutingModule} from './admin-bar-routing.module';



@NgModule({
  declarations: [AdminBarComponent, OrdersComponent, ProductsComponent, NewProductComponent, StatisticsComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    AdminBarRoutingModule
  ]
})
export class AdminBarModule { }
