import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { OrderStatus } from './models/order-status.model';
import { OrderProduct } from './models/order-product.model';
import { ProductModule } from '../product/product.module';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [OrdersService],
  controllers: [OrdersController],
  imports: [
    SequelizeModule.forFeature([Order, OrderStatus, OrderProduct]),
    ProductModule,
    UsersModule,
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
