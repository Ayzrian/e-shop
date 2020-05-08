import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Address } from './address.model';
import { Card } from './card.model';

@Table
export class User extends Model<User> {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  dataOfBirth: Date;

  @Column
  email: string;

  @Column
  sex: string;

  @HasMany(() => Address)
  addresses: Address[];

  @HasMany(() => Card)
  cards: Card[];
}
