import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { CreateOrderDTO } from './dto/create-order-dto';
import { OrderStatus } from './models/order-status.model';
import { OrderProduct } from './models/order-product.model';
import { Product } from '../product/models/product.model';
import { User } from '../users/models/user.model';
import { ProductService } from '../product/product.service';
import { UsersService } from '../users/users.service';
import * as chance from 'chance';
import { Address } from '../users/models/address.model';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private orderModel: typeof Order,
    @InjectModel(OrderStatus) private orderStatusModel: typeof OrderStatus,
    private productService: ProductService,
    private userService: UsersService,
  ) {
  }

  async createOrder(order: CreateOrderDTO) {
    if (order.userId && order.addressId) {
      return this.createSingleOrder(order);
    } else if (order.userId && !order.addressId) {
      return this.createOrderWithAddress(order);
    }
    return this.createOrderWithUser(order);
  }

  private async createOrderWithAddress(order: CreateOrderDTO) {
    order = await this.mapProductPrices(order);

    const createdAddress = await this.userService.addUserAddress(
      order.userId,
      order.address,
    );

    order.addressId = createdAddress.id;

    return this.orderModel.create(order, {
      include: [OrderProduct],
    });
  }

  private async createOrderWithUser(order: CreateOrderDTO) {
    order = await this.mapProductPrices(order);

    order.user.password = chance().string({ length: 12 });
    order.user.roleId = 2;

    const user = await this.userService.registerUser(order.user);

    order.userId = user.id;
    order.addressId = user.addresses[0].id;

    return this.orderModel.create(order, {
      include: [OrderProduct],
    });
  }

  private async createSingleOrder(order: CreateOrderDTO) {
    order = await this.mapProductPrices(order);

    return this.orderModel.create(order, {
      include: [OrderProduct],
    });
  }

  private async mapProductPrices(
    order: CreateOrderDTO,
  ): Promise<CreateOrderDTO> {
    const products = await Promise.all([
      ...order.products.map(({ productId }) =>
        this.productService.getProductById(productId),
      ),
    ]);

    return {
      ...order,
      products: order.products.map((product, index) => ({
        ...product,
        priceAtTheMomentOfOrder: products[index].price,
      })),
    };
  }

  getAll() {
    return this.orderModel.findAll({
      include: [OrderStatus, OrderProduct, User],
    });
  }

  async getOrderById(orderId: number) {
    return this.orderModel.findByPk(orderId, {
      include: [
        {
          model: OrderProduct,
          include: [Product],
        },
        User,
        OrderStatus,
        Address,
      ],
    });
  }

  getAllStatuses() {
    return this.orderStatusModel.findAll();
  }

  async updateProductStatus(orderId: number, statusId: number) {
    const targetOrder = await this.orderModel.findByPk(orderId);
    const updateObj: any = {
      statusId,
    };

    if (statusId === 5) {
      updateObj.fulfilledAt = new Date();
    }

    return targetOrder.update(updateObj);
  }
}
