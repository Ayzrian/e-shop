import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProductType } from './product-type.model';

@Table
export class CharacteristicDescriptor extends Model<CharacteristicDescriptor> {
  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(true)
  @Column
  description?: string;

  @BelongsTo(() => ProductType)
  productType: ProductType;

  @ForeignKey(() => ProductType)
  @AllowNull(false)
  @Column
  productTypeId: number;
}
