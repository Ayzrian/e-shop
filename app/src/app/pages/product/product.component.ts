import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, RouterState} from '@angular/router';
import {ProductsApiService} from '../../services/products-api.service';
import {IProduct} from '../../interfaces/products.interfaces';
import {BasketService} from '../basket/basket.service';

@Component({
  selector: 'app-item',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product: IProduct;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private productsApiService: ProductsApiService,
    private basketService: BasketService
  ) {
  }

  async ngOnInit() {
    this.loading = true;

    this.product = await this.productsApiService.getProductById(
      this.route.snapshot.params.id
    );

    this.loading = false;
  }

  onBuyProduct() {
    this.basketService.addProduct(this.product);
  }
}
