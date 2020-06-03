import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoaderComponent} from './loader/loader.component';
import {
  MatProgressSpinnerModule,
} from '@angular/material/progress-spinner';
import {FiltersComponent} from './filters/filters.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSliderModule} from '@angular/material/slider';

@NgModule({
  declarations: [LoaderComponent, FiltersComponent],
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatSelectModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatSliderModule,
    ],
  exports: [LoaderComponent, FiltersComponent],
})
export class ComponentsModule {
}
