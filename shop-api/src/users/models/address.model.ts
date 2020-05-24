import { AllowNull, BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './user.model';

@Table
export class Address extends Model<Address> {
  @Column
  country: string;

  @Column
  city: string;

  @Column
  street: string;

  @Column
  building: string;

  @AllowNull(true)
  @Column
  flat?: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  userId: number;
}
