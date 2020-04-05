import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  dataSource = new MatTableDataSource([
    {
      type: 'MOBILE',
      name: 'Redmi Note T6',
      brand: 'Xiaomi',
      price: 55,
      stock: 15,
    },
    {
      type: 'TABLET',
      name: 'Samsung als ',
      brand: 'Samsung',
      price: 200,
      stock: 5
    },
    {
      type: 'MOBILE',
      name: 'IPhone 10',
      brand: 'Apple',
      price: 10,
      stock: 16
    },
    {
      type: 'MOBILE',
      name: 'Nokia T2',
      brand: 'Nokia',
      price: 35,
      stock: 160
    },
    {
      type: 'MOBILE',
      name: 'Redmi Note T6',
      brand: 'Xiaomi',
      price: 55,
      stock: 523
    },
    {
      type: 'TABLET',
      name: 'Samsung als ',
      brand: 'Samsung',
      price: 200,
      stock: 605
    },
    {
      type: 'MOBILE',
      name: 'IPhone 10',
      brand: 'Apple',
      price: 10,
      stock: 615
    },
    {
      type: 'MOBILE',
      name: 'Nokia T2',
      brand: 'Nokia',
      price: 35,
      stock: 59
    },
    {
      type: 'MOBILE',
      name: 'Redmi Note T6',
      brand: 'Xiaomi',
      price: 55,
      stock: 513
    },
    {
      type: 'TABLET',
      name: 'Samsung als ',
      brand: 'Samsung',
      price: 200,
      stock: 563
    },
    {
      type: 'MOBILE',
      name: 'IPhone 10',
      brand: 'Apple',
      price: 10,
      stock: 6213
    },
    {
      type: 'MOBILE',
      name: 'Nokia T2',
      brand: 'Nokia',
      price: 35,
      stock: 623
    },
    {
      type: 'MOBILE',
      name: 'Redmi Note T6',
      brand: 'Xiaomi',
      price: 55,
      stock: 6342
    },
  ]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  selectedType = '';

  displayedColumns = ['type', 'name', 'brand', 'price', 'stock'];

  constructor() {
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
