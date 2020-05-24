import { AllowNull, Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Order } from './order.model';

@Table
export class OrderStatus extends Model<OrderStatus> {
  @AllowNull(false)
  @Column
  status: string;

  @HasMany(() => Order)
  orders: Order[];
}
