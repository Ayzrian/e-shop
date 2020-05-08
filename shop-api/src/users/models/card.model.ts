import { Column, Model, Table } from 'sequelize-typescript';


@Table
export class Card extends Model<Card> {
  @Column
  cardNumber: string;

  @Column
  expirationDate: string;

  @Column
  cvv: string;
}
