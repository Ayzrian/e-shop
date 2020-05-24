import {Component, OnInit} from '@angular/core';
import {OrdersApiService} from '../../services/orders-api.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IOrder} from '../../interfaces/basket.interfaces';
import {NotificationService} from '../../utilities/notification.service';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.scss'],
})
export class TrackOrderComponent implements OnInit {
  form = new FormGroup({
    id: new FormControl('', [Validators.required, Validators.min(1)]),
  });

  loading = false;

  order: IOrder = null;

  constructor(private ordersApiService: OrdersApiService, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    this.loading = true;

    try {
      const {id} = this.form.value;

      this.order = await this.ordersApiService.getOrderById(id);

      if (!this.order) {
        this.notificationService.notify('Кажется вы ввели несуществующий номер заказа.');
      }

    } catch (e) {
      console.log(e);

      this.notificationService.notify('Что-то пошло не так. Обратитесь в службу поддержки.');
    } finally {
      this.loading = false;
    }
  }
}
