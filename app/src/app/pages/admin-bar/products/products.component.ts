import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ProductsApiService} from '../../../services/products-api.service';
import {IProductType} from '../../../interfaces/products.interfaces';
import {IFilter} from '../../../components/filters/filters.interfaces';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  dataSource = new MatTableDataSource([]);
  loading = false;
  filtersQuery: any = {};

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns = ['type', 'name', 'brand', 'price'];
  productTypes: IProductType[] = [];

  filtersMeta: IFilter[] = [];

  constructor(private productsApiService: ProductsApiService) {
  }

  async ngOnInit() {
    this.loading = true;

    this.dataSource.paginator = this.paginator;

    [this.productTypes, this.dataSource.data] = await Promise.all([
      this.productsApiService.getProductTypes(),
      this.productsApiService.getProducts({}),
    ]);

    this.initFilter();

    this.loading = false;
  }

  initFilter() {
    this.filtersMeta = [
      {
        type: 'text',
        name: 'Имя продукта',
        label: 'Имя продукта',
        selectedValue: null,
        queryField: 'name',
      },
      {
        type: 'text',
        name: 'Бренд продукта',
        label: 'Бренд продукта',
        selectedValue: null,
        queryField: 'brand',
      },
      {
        type: 'select',
        name: 'Тип продукта',
        label: 'Тип продукта',
        selectedValue: null,
        queryField: 'typeId',
        options: [
          {
            value: null,
            label: 'Любой',
          },
          ...this.productTypes.map(({type, id}) => ({
            label: type,
            value: String(id),
          })),
        ],
      },
    ];
  }

  async onFiltersChange(query: object) {
    this.filtersQuery = query;
  }

  async onSearch() {
    await this.fetchProducts(this.filtersQuery);
  }

  async fetchProducts(query?: object) {
    this.loading = true;

    this.dataSource.data = await this.productsApiService.getProducts(query);

    this.loading = false;
  }
}
