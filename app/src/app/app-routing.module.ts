import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {SignUpComponent} from './pages/sign-up/sign-up.component';
import {BasketComponent} from './pages/basket/basket.component';
import {CatalogComponent} from './pages/catalog/catalog.component';
import {AdminBarComponent} from './pages/admin-bar/admin-bar.component';
import {OrdersComponent} from './pages/admin-bar/orders/orders.component';
import {ProductsComponent} from './pages/admin-bar/products/products.component';
import {NewProductComponent} from './pages/admin-bar/new-product/new-product.component';
import {StatisticsComponent} from './pages/admin-bar/statistics/statistics.component';
import {ProductComponent} from './pages/product/product.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'catalog',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'basket',
    component: BasketComponent,
  },
  {
    path: 'catalog',
    component: CatalogComponent,
  },
  {
    path: 'product/:id',
    component: ProductComponent,
  },
  {
    path: 'admin',
    component: AdminBarComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'orders',
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'new-product',
        component: NewProductComponent,
      },
      {
        path: 'statistics',
        component: StatisticsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
