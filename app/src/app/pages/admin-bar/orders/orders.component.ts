import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {OrdersApiService} from '../../../services/orders-api.service';
import {ancestorWhere} from 'tslint';
import {NotificationService} from '../../../utilities/notification.service';
import {IOrder, IStatus} from '../../../interfaces/basket.interfaces';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  dataSource = new MatTableDataSource([]);
  statuses: IStatus[] = [];

  loading = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns = ['id', 'customer', 'price', 'status'];

  constructor(
    private ordersService: OrdersApiService,
    private notificationService: NotificationService
  ) {
  }

  async ngOnInit() {
    try {
      this.loading = true;

      const orders = await this.ordersService.getAllOrders();
      this.statuses = await this.ordersService.getAllStatuses();

      this.dataSource.data = orders;
    } catch (e) {
      console.log(e);

      this.notificationService.notify(
        'Кажется что-то не так. Обратитесь в тех поддержку.'
      );
    } finally {
      this.loading = false;
    }

    this.dataSource.paginator = this.paginator;
  }

  async onOrderStatusChange(newStatusId: number, order: IOrder) {
    try {
      this.loading = true;

      await this.ordersService.updateOrderStatus(order.id, newStatusId);

      this.dataSource.data = this.dataSource.data.map((currentOrder) => {
        if (currentOrder.id === order.id) {
          return {
            ...currentOrder,
            statusId: newStatusId,
            status: this.statuses.find((status) => status.id === newStatusId),
          };
        }

        return currentOrder;
      });
    } catch (e) {
      console.log(e);

      this.notificationService.notify(
        'Кажется что-то не так. Обратитесь в тех поддержку.'
      );
    } finally {
      this.loading = false;
    }
  }

  getOrderPrice(order: IOrder): number {
    return order.products.reduce(
      (acc, product) => acc + product.priceAtTheMomentOfOrder,
      0
    );
  }
}
