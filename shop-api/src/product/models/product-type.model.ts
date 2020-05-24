import { AllowNull, Column, HasMany, Model, Table } from 'sequelize-typescript';
import { CharacteristicDescriptor } from './characteristic-descriptor.model';
import { Product } from './product.model';

@Table
export class ProductType extends Model<ProductType> {
  @AllowNull(false)
  @Column
  type: string;

  @HasMany(() => CharacteristicDescriptor)
  characteristicsDescriptors: CharacteristicDescriptor[];

  @HasMany(() => Product)
  products: Product[];
}
