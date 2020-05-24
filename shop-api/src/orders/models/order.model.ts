import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  Default,
  ForeignKey,
  HasMany,
  Model,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { User } from '../../users/models/user.model';
import { OrderProduct } from './order-product.model';
import { OrderStatus } from './order-status.model';
import { Address } from '../../users/models/address.model';

@Table
export class Order extends Model<Order> {

  @AllowNull(true)
  @Default(null)
  @Column
  fulfilledAT: Date;

  @CreatedAt
  createdAt: Date;

  @HasMany(() => OrderProduct)
  products: OrderProduct[];

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId: number;

  @BelongsTo(() => Address)
  address: Address;

  @ForeignKey(() => Address)
  @AllowNull(false)
  @Column
  addressId: number;

  @BelongsTo(() => OrderStatus)
  status: OrderStatus;

  @ForeignKey(() => OrderStatus)
  @AllowNull(false)
  @Default(4)
  @Column
  statusId: number;
}
