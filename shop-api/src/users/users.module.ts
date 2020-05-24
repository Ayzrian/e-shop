import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Address } from './models/address.model';
import { Card } from './models/card.model';
import { Role } from './models/role.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Address, Card, Role])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
