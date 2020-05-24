import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, MatCardModule, MatDividerModule, MatListModule],
  exports: [ProfileComponent],
})
export class ProfileModule {
}
