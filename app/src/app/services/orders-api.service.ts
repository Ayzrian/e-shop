import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {IOrder, IStatus} from '../interfaces/basket.interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrdersApiService extends ApiService {
  constructor(protected http: HttpClient) {
    super(http);
  }

  createOrder(order: IOrder): Promise<IOrder> {
    return this.http.post<IOrder>(this.url('/orders'), order).toPromise();
  }

  getAllOrders(): Promise<IOrder[]> {
    return this.http.get<IOrder[]>(this.url('/orders')).toPromise();
  }

  getAllStatuses(): Promise<IStatus[]> {
    return this.http.get<IStatus[]>(this.url('/orders/statuses')).toPromise();
  }

  updateOrderStatus(orderId: number, statusId: number): Promise<IStatus> {
    return this.http
      .put<IStatus>(this.url(`/orders/${orderId}/status/${statusId}`), null)
      .toPromise();
  }

  getOrderById(id: number): Promise<IOrder> {
    return this.http.get<IOrder>(this.url(`/orders/${id}`)).toPromise();
  }
}
