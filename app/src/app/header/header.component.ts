import {Component, OnInit} from '@angular/core';
import {BasketService} from '../pages/basket/basket.service';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  total$: Observable<number>;
  isUserAuthorized$: Observable<boolean>;
  isUserAdmin$: Observable<boolean>;

  constructor(
    private basketService: BasketService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.total$ = this.basketService.totalProduct$;

    const user$ = this.authService.getCurrentUser();

    this.isUserAuthorized$ = user$.pipe(map((user) => Boolean(user)));

    this.isUserAdmin$ = user$.pipe(map((user) => user?.role?.role === 'ADMIN'));
  }

  onLogout() {
    this.authService.logout();

    this.router.navigate(['/catalog']);
  }
}
