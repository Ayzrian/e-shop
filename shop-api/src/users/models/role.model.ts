import { Column, HasMany, Model, Table, Unique } from 'sequelize-typescript';
import { User } from './user.model';

@Table
export class Role extends Model<Role> {
  @Unique
  @Column
  role: string;

  @HasMany(() => User)
  users: User[];
}
