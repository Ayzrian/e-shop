import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Address } from './address.model';
import { Card } from './card.model';
import { Role } from './role.model';
import { Order } from '../../orders/models/order.model';

@Table
export class User extends Model<User> {
  @AllowNull(false)
  @Column
  firstName: string;

  @AllowNull(false)
  @Column
  lastName: string;

  @AllowNull(true)
  @Column
  dateOfBirth: Date;

  @Unique
  @AllowNull(false)
  @Column
  email: string;

  @Unique
  @AllowNull(false)
  @Column
  phoneNumber: string;

  @AllowNull(true)
  @Column
  password: string;

  @AllowNull(true)
  @Column
  sex: string;

  @HasMany(() => Address)
  addresses: Address[];

  @HasMany(() => Card)
  cards: Card[];

  @BelongsTo(() => Role)
  role: Role;

  @ForeignKey(() => Role)
  @AllowNull(false)
  @Column
  roleId: number;

  @HasMany(() => Order)
  orders: Order[];
}
