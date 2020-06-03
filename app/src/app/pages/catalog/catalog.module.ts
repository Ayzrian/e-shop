import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CatalogComponent} from './catalog.component';
import {SearchComponent} from './search/search.component';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatSliderModule} from '@angular/material/slider';
import {RouterModule} from '@angular/router';
import {ComponentsModule} from '../../components/components.module';


@NgModule({
  declarations: [CatalogComponent, SearchComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSliderModule,
    RouterModule,
    ComponentsModule
  ]
})
export class CatalogModule {
}
