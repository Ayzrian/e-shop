import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { FiltersComponent } from './filters/filters.component';
import { SearchComponent } from './search/search.component';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [CatalogComponent, FiltersComponent, SearchComponent],
    imports: [
        CommonModule,
        MatCardModule
    ]
})
export class CatalogModule { }
