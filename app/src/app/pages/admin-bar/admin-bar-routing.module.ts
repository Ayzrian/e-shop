import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {OrdersComponent} from './orders/orders.component';
import {ProductsComponent} from './products/products.component';
import {NewProductComponent} from './new-product/new-product.component';
import {StatisticsComponent} from './statistics/statistics.component';



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([{
      path: 'admin',
      children: [{
        path: 'orders',
        component: OrdersComponent,
      }, {
        path: 'products',
        component: ProductsComponent,
      }, {
        path: 'new-product',
        component: NewProductComponent,
      }, {
        path: 'statistics',
        component: StatisticsComponent,
      }]
    }])
  ],
  exports: [
    RouterModule
  ]
})
export class AdminBarRoutingModule { }
