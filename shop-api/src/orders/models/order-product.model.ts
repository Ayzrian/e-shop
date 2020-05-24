import {
  AllowNull,
  BelongsTo,
  Column, DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from '../../product/models/product.model';
import { Order } from './order.model';

@Table
export class OrderProduct extends Model<OrderProduct> {
  @AllowNull(false)
  @Column(DataType.FLOAT)
  priceAtTheMomentOfOrder: number;

  @AllowNull(false)
  @Column
  amount: number;

  @BelongsTo(() => Product)
  product: Product;

  @ForeignKey(() => Product)
  @AllowNull(false)
  @Column
  productId: number;

  @BelongsTo(() => Order)
  order: Order;

  @ForeignKey(() => Order)
  @AllowNull(false)
  @Column
  orderId: number;
}
