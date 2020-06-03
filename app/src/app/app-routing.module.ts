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
import {NewTypeComponent} from './pages/admin-bar/new-type/new-type.component';
import {TrackOrderComponent} from './pages/track-order/track-order.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {IsAdminGuard} from './guards/is-admin.guard';
import {IsAuthorizedGuard} from './guards/is-authorized.guard';
import {EditProductComponent} from './pages/admin-bar/edit-product/edit-product.component';

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
    path: 'track-order',
    component: TrackOrderComponent,
  },
  {
    path: 'profile',
    canActivate: [IsAuthorizedGuard],
    component: ProfileComponent,
  },
  {
    path: 'admin',
    component: AdminBarComponent,
    canActivate: [IsAuthorizedGuard, IsAdminGuard],
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
      {
        path: 'edit-product/:id',
        component: EditProductComponent
      },
      {
        path: 'new-type',
        component: NewTypeComponent,
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
