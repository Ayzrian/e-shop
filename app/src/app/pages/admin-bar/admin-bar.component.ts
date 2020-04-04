import {Component, OnInit} from '@angular/core';
import {INavLink} from '../../../interfaces/general';

@Component({
  selector: 'app-admin-bar',
  templateUrl: './admin-bar.component.html',
  styleUrls: ['./admin-bar.component.scss']
})
export class AdminBarComponent implements OnInit {
  links: INavLink[] = [{
    text: 'Orders',
    route: 'orders',
    icon: 'work'
  }, {
    text: 'Products',
    route: 'products',
    icon: 'ballot'
  }, {
    text: 'New Product',
    route: 'new-product',
    icon: 'add_circle'
  }, {
    text: 'Statistics',
    route: 'statics',
    icon: 'assessment'
  }];

  constructor() {
  }

  ngOnInit(): void {
  }

}
