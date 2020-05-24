import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Role } from './models/role.model';
import { Address } from './models/address.model';
import { Card } from './models/card.model';
import { RegisterUserDto } from '../auth/dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { saltRounds } from '../constants';
import { AddressDTO } from './dto/address.dto';
import { Order } from '../orders/models/order.model';
import { OrderStatus } from '../orders/models/order-status.model';
import { OrderProduct } from '../orders/models/order-product.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {
  }

  findUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        email,
      },
      include: [Role, Address, Card],
    });
  }

  findUserById(id: number): Promise<User> {
    return this.userModel.findByPk(id, {
      include: [Role, Address, Card, {
        model: Order,
        include: [OrderStatus, OrderProduct]
      }],
    });
  }

  async addUserAddress(id: number, address: AddressDTO): Promise<Address> {
    const user = await this.findUserById(id);

    return user.$create('address', address);
  }

  async getUserAddresses(id: number) {
    const user = await this.findUserById(id);

    return user.addresses;
  }

  async registerUser(user: RegisterUserDto): Promise<User> {
    user.password = await bcrypt.hash(user.password, saltRounds);

    const createdUser = await this.userModel.create(user, {
      include: [Address, Card],
    });

    return this.userModel.findByPk(createdUser.id, {
      include: [Address, Card, Role],
    });
  }
}
