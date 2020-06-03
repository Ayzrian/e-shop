import {Component, OnInit} from '@angular/core';
import {ProductsApiService} from '../../services/products-api.service';
import {IProduct, IProductType} from '../../interfaces/products.interfaces';
import {IFilter} from '../../components/filters/filters.interfaces';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  loading = false;
  products: IProduct[] = [];
  productTypes: IProductType[] = [];

  itemsPerBatch = 20;

  filtersMeta: IFilter[] = [];
  filtersQuery: any = {};
  pageSettings = {
    limit: this.itemsPerBatch,
    offset: 0,
  };

  constructor(private productsApiService: ProductsApiService) {
  }

  async ngOnInit() {
    await this.loadProducts();
  }

  async loadProducts() {
    this.loading = true;

    await this.fetchProducts({...this.filtersQuery, ...this.pageSettings});
    this.productTypes = await this.productsApiService.getProductTypes();
    await this.initFilter();

    this.loading = false;
  }

  trackProductById(index: number, product: IProduct) {
    return product.id;
  }

  async initFilter() {
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
        type: 'range',
        name: 'Цена продукта',
        label: 'Цена продукта больше',
        selectedValue: 0,
        queryField: 'price_gte',
        max: await this.productsApiService.getMaxPrice()
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
    this.pageSettings = {limit: this.itemsPerBatch, offset: 0};
  }

  async onSearch() {
    await this.fetchProducts({...this.filtersQuery, ...this.pageSettings});
  }

  async fetchProducts(query?: object) {
    this.loading = true;

    this.products = await this.productsApiService.getProducts(query);

    this.loading = false;
  }

  async onLoadMore() {
    this.loading = true;

    this.pageSettings.limit += this.itemsPerBatch;
    this.pageSettings.offset += this.itemsPerBatch;

    const newData = await this.productsApiService.getProducts({
      ...this.filtersQuery,
      ...this.pageSettings,
    });

    this.products = this.products.concat(newData);

    this.loading = false;
  }
}
