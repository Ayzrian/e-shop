import { AllowNull, Column, Model, Table } from 'sequelize-typescript';

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

  @Column
  @AllowNull
  flat: string;
}
