import {IOrder} from './basket.interfaces';

export interface ILogin {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
  sex: string;
  roleId: number;
  phoneNumber: string;
  createdAt?: Date;
  password?: string;
  updatedAt?: Date;
  role?: IRole;
  addresses: IAddress[];
  cards: ICard[];
  orders?: IOrder[];
}

export interface IMinimalUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface IAddress {
  id?: number;
  userId?: number;
  country: string;
  city: string;
  street: string;
  building: string;
  flat?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICard {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
}

export interface IRole {
  role: string;
  id: number;
}

export enum EUserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
