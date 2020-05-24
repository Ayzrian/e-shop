import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Observable} from 'rxjs';
import {IUser} from '../../interfaces/users.interfaces';
import {IOrder} from '../../interfaces/basket.interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user$: Observable<IUser>;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.user$ = this.authService.getCurrentUser();
  }

  getPrice(order: IOrder) {
    return order.products.reduce(
      (acc, product) => acc + product.priceAtTheMomentOfOrder,
      0
    );
  }
}
