import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './user.model';


@Table
export class Card extends Model<Card> {
  @Column
  cardNumber: string;

  @Column
  expirationDate: string;

  @Column
  cvv: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  userId: number;
}
