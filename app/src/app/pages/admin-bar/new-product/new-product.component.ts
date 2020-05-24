import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {IProductType} from '../../../interfaces/products.interfaces';
import {ProductsApiService} from '../../../services/products-api.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../../utilities/notification.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent implements OnInit {
  loading = false;
  productTypes: IProductType[] = [];
  currentType: string;
  form = new FormGroup({
    name: new FormControl(),
    price: new FormControl(),
    brand: new FormControl(),
  });

  constructor(
    private productsApiService: ProductsApiService,
    private notificationService: NotificationService
  ) {
  }

  async ngOnInit() {
    this.loading = true;

    this.productTypes = await this.productsApiService.getProductTypes();

    if (this.productTypes.length > 0) {
      this.currentType = this.productTypes[0].type;
      this.buildForm();
    }

    this.loading = false;
  }

  onTypeChange(type: string) {
    this.currentType = type;
    this.buildForm();
  }

  getCurrentProduct() {
    return this.productTypes.find(({type}) => type === this.currentType);
  }

  buildForm() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.min(3)]),
      price: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required, Validators.min(2)]),
      image: new FormControl(null),
    });

    const productType = this.getCurrentProduct();

    productType.characteristicsDescriptors.forEach(({name}) => {
      this.form.registerControl(
        name,
        new FormControl('', [Validators.required, Validators.min(3)])
      );
    });
  }

  async onSave() {
    this.loading = true;
    try {
      const {name, price, brand, image, ...characteristics} = this.form.value;

      const {imagePath} = await this.productsApiService.uploadProductImage(image);

      const product = {
        name,
        price,
        brand,
        imagePath,
        typeId: this.getCurrentProduct().id,
        characteristics: Object.entries(characteristics).map(
          ([characteristicName, value]) => ({
            value: value as string,
            descriptorId: this.getCurrentProduct().characteristicsDescriptors.find(
              ({name: n}) => n === characteristicName
            ).id,
          })
        ),
      };

      await this.productsApiService.createProduct(product);

      this.notificationService.notify('Вы успешно создали продукт!');

      this.form.reset();
    } catch (e) {
      this.notificationService.notify(
        'Не получилось добавить продукт. Попробуйте еще раз позже.'
      );
    } finally {
      this.loading = false;
    }
  }

  onImageChange(files: File[]) {
    const [image] = files;

    if (image) {
      this.form.get('image').setValue(image);
    }
  }
}
