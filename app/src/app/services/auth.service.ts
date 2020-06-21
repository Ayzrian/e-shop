import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {ILogin, IUser} from '../interfaces/users.interfaces';
import {BehaviorSubject, Observable} from 'rxjs';
import {BasketService} from '../pages/basket/basket.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  private currentUser$ = new BehaviorSubject<IUser>(null);
  token: string;

  constructor(
    protected http: HttpClient,
    protected basketService: BasketService
  ) {
    super(http);

    const user = localStorage.getItem('user');
    this.token = localStorage.getItem('token');

    if (user) {
      this.currentUser$.next(JSON.parse(user));
    }
  }

  async login(data: ILogin) {
    const {access_token} = await this.http
      .post<{ access_token: string }>(this.url('/login'), data)
      .toPromise();

    localStorage.setItem('token', access_token);
    this.token = access_token;

    const user = await this.http.get<IUser>(this.url('/users/me')).toPromise();

    localStorage.setItem('user', JSON.stringify(user));

    this.currentUser$.next(user);

    return user;
  }

  getToken() {
    return this.token;
  }

  async updateUser() {
    const user = await this.http.get<IUser>(this.url('/users/me')).toPromise();

    localStorage.setItem('user', JSON.stringify(user));

    this.currentUser$.next(user);
  }

  async register(user: IUser) {
    const registeredUser = await this.http
      .post<IUser>(this.url('/sign-up'), user)
      .toPromise();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.token = null;
    this.currentUser$.next(null);
    this.basketService.clearBasket();
  }

  getCurrentUser(): BehaviorSubject<IUser> {
    return this.currentUser$;
  }
}
