import {IProduct} from './products.interfaces';
import {IAddress, IUser} from './users.interfaces';

export interface IBasketItem {
  productId: number;
  priceAtTheMomentOfOrder?: number;
  amount: number;
  product?: IProduct;
}

export interface IOrder {
  id?: number;
  userId?: number;
  statusId: number;
  status?: IStatus;
  addressId?: number;
  user?: IUser;
  address?: IAddress;
  fulFilledAt?: Date;
  products: IBasketItem[];
}

export interface IOrderCreationOptions {
  createNewUser?: boolean;
  createNewAddress?: boolean;
}

export interface IStatus {
  id: number;
  status: string;
}
