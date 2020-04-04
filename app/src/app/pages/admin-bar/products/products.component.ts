import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products = [
    {
      type: 'MOBILE',
      name: 'Redmi Note T6',
      brand: 'Xiaomi',
      price: 55,
    },
    {
      type: 'TABLET',
      name: 'Samsung als ',
      brand: 'Samsung',
      price: 200,
    },
    {
      type: 'MOBILE',
      name: 'IPhone 10',
      brand: 'Apple',
      price: 10,
    },
    {
      type: 'MOBILE',
      name: 'Nokia T2',
      brand: 'Nokia',
      price: 35,
    },
    {
      type: 'MOBILE',
      name: 'Redmi Note T6',
      brand: 'Xiaomi',
      price: 55,
    },
    {
      type: 'TABLET',
      name: 'Samsung als ',
      brand: 'Samsung',
      price: 200,
    },
    {
      type: 'MOBILE',
      name: 'IPhone 10',
      brand: 'Apple',
      price: 10,
    },
    {
      type: 'MOBILE',
      name: 'Nokia T2',
      brand: 'Nokia',
      price: 35,
    },
    {
      type: 'MOBILE',
      name: 'Redmi Note T6',
      brand: 'Xiaomi',
      price: 55,
    },
    {
      type: 'TABLET',
      name: 'Samsung als ',
      brand: 'Samsung',
      price: 200,
    },
    {
      type: 'MOBILE',
      name: 'IPhone 10',
      brand: 'Apple',
      price: 10,
    },
    {
      type: 'MOBILE',
      name: 'Nokia T2',
      brand: 'Nokia',
      price: 35,
    },
    {
      type: 'MOBILE',
      name: 'Redmi Note T6',
      brand: 'Xiaomi',
      price: 55,
    },
  ];

  selectedType = '';

  displayedColumns = ['type', 'name', 'brand', 'price'];

  constructor() {
  }

  ngOnInit(): void {
  }
}
