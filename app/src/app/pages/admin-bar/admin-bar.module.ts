import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminBarComponent} from './admin-bar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {OrdersComponent} from './orders/orders.component';
import {ProductsComponent} from './products/products.component';
import {NewProductComponent} from './new-product/new-product.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {RouterModule} from '@angular/router';
import {MatTreeModule} from '@angular/material/tree';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {NewTypeComponent} from './new-type/new-type.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {ComponentsModule} from '../../components/components.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {EditProductComponent} from './edit-product/edit-product.component';
import { PopularComponent } from './popular/popular.component';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  declarations: [
    AdminBarComponent,
    OrdersComponent,
    ProductsComponent,
    NewProductComponent,
    StatisticsComponent,
    NewTypeComponent,
    EditProductComponent,
    PopularComponent,
  ],
  imports: [
    ComponentsModule,
    MatSnackBarModule,
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    MatTreeModule,
    MatTableModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatPaginatorModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
})
export class AdminBarModule {
}
