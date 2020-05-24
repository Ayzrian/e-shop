import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from './product.model';
import { CharacteristicDescriptor } from './characteristic-descriptor.model';

@Table
export class Characteristic extends Model<Characteristic> {
  @AllowNull(false)
  @Column
  value: string;

  @BelongsTo(() => CharacteristicDescriptor)
  descriptor: CharacteristicDescriptor;

  @ForeignKey(() => CharacteristicDescriptor)
  @AllowNull(false)
  @Column
  descriptorId: number;

  @BelongsTo(() => Product)
  product: Product;

  @ForeignKey(() => Product)
  @AllowNull(false)
  @Column
  productId: number;
}
