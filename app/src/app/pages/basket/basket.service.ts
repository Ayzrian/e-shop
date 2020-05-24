import {Injectable} from '@angular/core';
import {IProduct} from '../../interfaces/products.interfaces';
import {BehaviorSubject, Observable} from 'rxjs';
import {IBasketItem, IOrder, IOrderCreationOptions} from '../../interfaces/basket.interfaces';
import {IAddress, IMinimalUser} from '../../interfaces/users.interfaces';
import {OrdersApiService} from '../../services/orders-api.service';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  totalCost$ = new BehaviorSubject<number>(0);
  totalProduct$ = new BehaviorSubject<number>(0);
  items$ = new BehaviorSubject<IBasketItem[]>(this.getInitialItems());

  constructor(
    private ordersApiService: OrdersApiService
  ) {
    this.items$.subscribe((items) => {
      this.totalProduct$.next(
        items.reduce((count, item) => count + item.amount, 0)
      );
      this.totalCost$.next(
        items.reduce(
          (total, item) => total + item.product.price * item.amount,
          0
        )
      );

      localStorage.setItem('__basket__', JSON.stringify(items));
    });
  }

  getInitialItems() {
    const savedItems = localStorage.getItem('__basket__');
    if (savedItems) {
      return JSON.parse(savedItems);
    }

    return [];
  }

  addProduct(product: IProduct) {
    const {value} = this.items$;

    const productIndex = value.findIndex(
      (item) => item.product.id === product.id
    );

    if (productIndex !== -1) {
      this.increaseItemCount(productIndex);
    } else {
      this.items$.next(
        this.items$.value.concat({productId: product.id, amount: 1, product})
      );
    }
  }

  increaseItemCount(index: number) {
    const basket = [...this.items$.value];
    basket[index].amount++;
    this.items$.next(basket);
  }

  decreaseItemCount(index: number) {
    const basket = [...this.items$.value];
    basket[index].amount--;

    if (basket[index].amount === 0) {
      basket.splice(index);
    }

    this.items$.next(basket);
  }

  getProducts(): BehaviorSubject<IBasketItem[]> {
    return this.items$;
  }

  getTotalCost(): Observable<number> {
    return this.totalCost$;
  }

  async createOrder(order: IOrder) {
    return this.ordersApiService.createOrder(order);
  }

  clearBasket() {
    this.items$.next([]);
    localStorage.setItem('__basket__', JSON.stringify([]));
  }
}
