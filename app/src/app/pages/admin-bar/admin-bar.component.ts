import {Component, OnInit} from '@angular/core';
import {INavLink} from '../../../interfaces/general';

@Component({
  selector: 'app-admin-bar',
  templateUrl: './admin-bar.component.html',
  styleUrls: ['./admin-bar.component.scss'],
})
export class AdminBarComponent implements OnInit {
  links: INavLink[] = [
    {
      text: 'Заказы',
      route: 'orders',
      icon: 'work',
    },
    {
      text: 'Продукты',
      route: 'products',
      icon: 'ballot',
    },
    {
      text: 'Новый продукт',
      route: 'new-product',
      icon: 'add_circle',
    },
    {
      text: 'Новый тип продукта',
      route: 'new-type',
      icon: 'add'
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }
}
