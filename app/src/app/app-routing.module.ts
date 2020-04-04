import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {SignUpComponent} from './pages/sign-up/sign-up.component';
import {BasketComponent} from './pages/basket/basket.component';
import {CatalogComponent} from './pages/catalog/catalog.component';
import {AdminBarComponent} from './pages/admin-bar/admin-bar.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'basket',
    component: BasketComponent,
  },
  {
    path: 'catalog',
    component: CatalogComponent
  },
  {
    path: 'admin',
    component: AdminBarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
