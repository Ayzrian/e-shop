import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {ProductsApiService} from '../../../services/products-api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NotificationService} from '../../../utilities/notification.service';

@Component({
  selector: 'app-new-type',
  templateUrl: './new-type.component.html',
  styleUrls: ['./new-type.component.scss'],
})
export class NewTypeComponent implements OnInit {
  form;

  loading = false;

  constructor(
    private fb: FormBuilder,
    private productsApiService: ProductsApiService,
    private snackBar: MatSnackBar,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      type: ['', [Validators.required, Validators.min(3)]],
      characteristicsDescriptors: this.fb.array(
        [['', [Validators.required, Validators.min(3)]]],
        [Validators.required]
      ),
    });
  }

  onAddCharacteristic() {
    (this.form.get('characteristicsDescriptors') as FormArray).push(
      this.fb.control('', [Validators.required, Validators.min(3)])
    );
  }

  onRemoveCharacteristic(index: number) {
    (this.form.get('characteristicsDescriptors') as FormArray).removeAt(index);
  }

  async onSubmit() {
    this.loading = true;
    try {
      const value = this.form.value;
      value.characteristicsDescriptors = value.characteristicsDescriptors.map(
        (name) => ({name})
      );

      await this.productsApiService.createProductType(value);

      this.notificationService.notify('Вы успешно создали новый тип продукта!');

      this.initForm();
    } catch (e) {
      this.notificationService.notify('Произошла ошибка. Повторите попытку позже.');
    } finally {
      this.loading = false;
    }
  }
}
