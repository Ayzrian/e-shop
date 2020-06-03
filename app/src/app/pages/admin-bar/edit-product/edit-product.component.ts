import {Component, OnInit} from '@angular/core';
import {IProduct} from '../../../interfaces/products.interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductsApiService} from '../../../services/products-api.service';
import {NotificationService} from '../../../utilities/notification.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  loading = false;

  form = new FormGroup({
    name: new FormControl(),
    price: new FormControl(),
    brand: new FormControl(),
  });
  product: IProduct;

  constructor(
    private productsApiService: ProductsApiService,
    private notificationService: NotificationService,
    private routeState: ActivatedRoute,
    private router: Router
  ) {
  }

  async ngOnInit() {
    this.loading = true;

    this.product = await this.productsApiService.getProductById(
      this.routeState.snapshot.params.id
    );

    this.buildForm();
    this.loading = false;
  }

  buildForm() {
    this.form = new FormGroup({
      name: new FormControl(this.product.name, [
        Validators.required,
        Validators.min(3),
      ]),
      price: new FormControl(this.product.price, [Validators.required]),
      brand: new FormControl(this.product.name, [
        Validators.required,
        Validators.min(2),
      ]),
    });

    this.product.characteristics.forEach(({value, descriptor: {name}}) => {
      this.form.registerControl(
        name,
        new FormControl(value, [Validators.required, Validators.min(3)])
      );
    });
  }

  async onSave() {
    this.loading = true;
    try {
      const {name, price, brand, ...characteristics} = this.form.value;

      const product = {
        id: this.product.id,
        name,
        price,
        brand,
        characteristics: Object.entries(characteristics).map(
          ([characteristicName, value]) => ({
            id: this.product.characteristics.find(
              ({descriptor: {name: n}}) => {
                return n === characteristicName;
              }
            ).id,
            value: value as string,
          })
        ),
      };

      await this.productsApiService.updateProduct(product);

      this.notificationService.notify('Вы успешно отредактировали продукт!');

      this.form.reset();

      this.router.navigate(['admin', 'products']);
    } catch (e) {
      this.notificationService.notify(
        'Не получилось отредактировать продукт. Попробуйте еще раз позже.'
      );
    } finally {
      this.loading = false;
    }
  }
}
