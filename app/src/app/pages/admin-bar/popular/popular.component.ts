import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ProductsApiService} from '../../../services/products-api.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss'],
})
export class PopularComponent implements OnInit {
  loading = false;
  dataSource = new MatTableDataSource<any>([]);

  displayedColumns = ['name', 'totalRevenue'];

  createdLt = '2020-07-03';
  createdGt = '2020-06-03';

  constructor(private productService: ProductsApiService) {
  }

  async ngOnInit() {
    this.loading = true;

    this.dataSource.data = await this.productService.getPopularProducts({
      created_lt: this.createdLt,
      created_gt: this.createdGt,
    });

    this.loading = false;
  }

  async onClick() {
    this.loading = true;

    this.dataSource.data = await this.productService.getPopularProducts({
      created_lt: new Date(this.createdLt).toISOString(),
      created_gt: new Date(this.createdGt).toISOString(),
    });

    this.loading = false;
  }
}
