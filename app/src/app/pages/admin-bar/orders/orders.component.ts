import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  dataSource = new MatTableDataSource([
    {
      id: 41,
      customer: 'Nazarii Romankiv',
      price: 153,
      status: 'PENDING SHIPPING',
    },
    {
      id: 511,
      customer: 'Nazarii Romankiv',
      price: 346,
      status: 'SHIPPED',
    },
    {
      id: 14,
      customer: 'Arturn Mazurkov',
      price: 71,
      status: 'CANCELED',
    },
    {
      id: 67,
      customer: 'Sofia Taran',
      price: 1753,
      status: 'PENDING PAYMENT',
    },
    {
      id: 41,
      customer: 'Nazarii Romankiv',
      price: 153,
      status: 'PENDING SHIPPING',
    },
    {
      id: 511,
      customer: 'Nazarii Romankiv',
      price: 346,
      status: 'SHIPPED',
    },
    {
      id: 14,
      customer: 'Arturn Mazurkov',
      price: 71,
      status: 'CANCELED',
    },
    {
      id: 67,
      customer: 'Sofia Taran',
      price: 1753,
      status: 'PENDING PAYMENT',
    },
    {
      id: 41,
      customer: 'Nazarii Romankiv',
      price: 153,
      status: 'PENDING SHIPPING',
    },
    {
      id: 511,
      customer: 'Nazarii Romankiv',
      price: 346,
      status: 'SHIPPED',
    },
    {
      id: 14,
      customer: 'Arturn Mazurkov',
      price: 71,
      status: 'CANCELED',
    },
    {
      id: 67,
      customer: 'Sofia Taran',
      price: 1753,
      status: 'PENDING PAYMENT',
    },
    {
      id: 41,
      customer: 'Nazarii Romankiv',
      price: 153,
      status: 'PENDING SHIPPING',
    },
    {
      id: 511,
      customer: 'Nazarii Romankiv',
      price: 346,
      status: 'SHIPPED',
    },
    {
      id: 14,
      customer: 'Arturn Mazurkov',
      price: 71,
      status: 'CANCELED',
    },
    {
      id: 67,
      customer: 'Sofia Taran',
      price: 1753,
      status: 'PENDING PAYMENT',
    },
    {
      id: 41,
      customer: 'Nazarii Romankiv',
      price: 153,
      status: 'PENDING SHIPPING',
    },
    {
      id: 511,
      customer: 'Nazarii Romankiv',
      price: 346,
      status: 'SHIPPED',
    },
    {
      id: 14,
      customer: 'Arturn Mazurkov',
      price: 71,
      status: 'CANCELED',
    },
    {
      id: 67,
      customer: 'Sofia Taran',
      price: 1753,
      status: 'PENDING PAYMENT',
    },
  ]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns = ['id', 'customer', 'price', 'status'];

  constructor() {
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
