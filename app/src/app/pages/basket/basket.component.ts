import { Component, OnInit } from "@angular/core";
import { BasketService } from "./basket.service";
import { BehaviorSubject, Observable } from "rxjs";
import { IBasketItem, IOrder } from "../../interfaces/basket.interfaces";
import { Form, FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { AuthService } from "../../services/auth.service";
import { IUser } from "../../interfaces/users.interfaces";
import { NotificationService } from "../../utilities/notification.service";

@Component({
  selector: "app-basket",
  templateUrl: "./basket.component.html",
  styleUrls: ["./basket.component.scss"],
})
export class BasketComponent implements OnInit {
  items$: BehaviorSubject<IBasketItem[]>;
  cost$: Observable<number>;
  user$: BehaviorSubject<IUser>;
  personalDataForm: FormGroup;
  addressForm: FormGroup;
  loading: boolean;
  wantToOrder = false;
  createdOrder = false;
  order: IOrder;

  constructor(
    private basketService: BasketService,
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.items$ = this.basketService.getProducts();
    this.cost$ = this.basketService.getTotalCost();
    this.user$ = this.authService.getCurrentUser();

    this.user$.subscribe((user) => {
      this.personalDataForm = this.fb.group({
        firstName: [
          "",
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ],
        ],
        lastName: [
          "",
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ],
        ],
        email: ["", [Validators.required, Validators.email]],
        phoneNumber: [
          "",
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ],
        ],
      });

      this.addressForm = this.fb.group({
        country: ["", [Validators.required, Validators.minLength(3)]],
        city: ["", [Validators.required, Validators.minLength(3)]],
        street: ["", [Validators.required, Validators.minLength(3)]],
        building: ["", [Validators.required, Validators.minLength(1)]],
        flat: [""],
      });

      if (user) {
        const {
          id,
          dateOfBirth,
          addresses,
          cards,
          role,
          roleId,
          sex,
          createdAt,
          updatedAt,
          password,
          orders,
          ...value
        } = user;

        this.personalDataForm.setValue(value);

        const [
          { id: adId, userId, createdAt: a, updatedAt: b, ...address },
        ] = user.addresses;

        if (address) {
          this.addressForm.setValue(address);
        }
      }
    });
  }

  onRemove(index: number) {
    this.basketService.decreaseItemCount(index);
  }

  onAdd(index: number) {
    this.basketService.increaseItemCount(index);
  }

  onSubmit() {
    this.wantToOrder = true;
  }

  async onSend() {
    try {
      this.loading = true;

      this.order = await this.createOrder();

      this.personalDataForm.reset();
      this.addressForm.reset();

      this.basketService.clearBasket();

      this.wantToOrder = false;
      this.createdOrder = true;
    } catch (e) {
      this.notificationService.notify(
        "Упс. Кажется что-то пошло не так. Обратитесь в службу поддержки."
      );
    } finally {
      this.loading = false;
    }
  }

  async createOrder() {
    if (this.isNeededToCreateNewUser()) {
      const user = this.personalDataForm.value;
      user.addresses = [this.addressForm.value];

      const order = {
        user,
        statusId: 4,
        products: this.items$.value,
      };

      return this.basketService.createOrder(order);
    } else if (this.isNeededToCreateNewAddress()) {
      const order = {
        statusId: 4,
        userId: this.user$.value.id,
        address: this.addressForm.value,
        products: this.items$.value,
      };

      return this.basketService.createOrder(order);
    } else {
      const order = {
        statusId: 4,
        userId: this.user$.value.id,
        addressId: this.user$.value.addresses[0].id,
        products: this.items$.value,
      };

      return this.basketService.createOrder(order);
    }
  }

  isNeededToCreateNewUser() {
    const user = this.user$.value;
    const { value } = this.personalDataForm;

    if (user) {
      return (
        user.firstName !== value.firstName ||
        user.lastName !== value.lastName ||
        user.email !== value.email ||
        user.phoneNumber !== value.phoneNumber
      );
    }

    return true;
  }

  isNeededToCreateNewAddress() {
    const user = this.user$.value;
    const { value } = this.addressForm;

    if (user) {
      const [address] = user.addresses;
      if (address) {
        return (
          address.country !== value.country ||
          address.city !== value.city ||
          address.building !== value.building ||
          address.street !== value.street ||
          address.flat !== value.flat
        );
      }
    }

    return true;
  }

  isInvalid(form: FormGroup, control: string): boolean {
    return form.controls[control].invalid;
  }

  getErrorMessage(
    form: FormGroup,
    control: string,
    minLength = 3,
    maxLength = 20
  ): string {
    const { errors } = form.controls[control];
    if (errors) {
      if (errors.required) {
        return "Это поле обязательное!";
      }

      if (errors.minlength) {
        return "Минимальная длина этого поля = " + minLength;
      }

      if (errors.maxlength) {
        return "Максимальная длина этого поля = " + maxLength;
      }

      if (errors.email) {
        return "Введите пожалуйста валидный електронный адрес";
      }
    }
  }
}
