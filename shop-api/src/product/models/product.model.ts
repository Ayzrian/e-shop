import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Characteristic } from './characteristic.model';
import { ProductType } from './product-type.model';
import { OrderProduct } from '../../orders/models/order-product.model';

@Table
export class Product extends Model<Product> {
  @AllowNull(false)
  @Column(DataType.FLOAT)
  price: number;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  brand: string;

  @AllowNull(true)
  @Column
  imagePath: string;

  @HasMany(() => Characteristic)
  characteristics: Characteristic[];

  @HasMany(() => OrderProduct)
  orderProducts: OrderProduct[];

  @BelongsTo(() => ProductType)
  type: ProductType;

  @ForeignKey(() => ProductType)
  @AllowNull(false)
  @Column
  typeId: number;
}
