import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dto/create-order-dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IsAdminGuard } from '../auth/guards/is-admin.guard';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  getAllOrder() {
    return this.ordersService.getAll();
  }

  @Get('/statuses')
  getStatuses() {
    return this.ordersService.getAllStatuses();
  }

  @Get(':orderId')
  getOrder(@Param('orderId') orderId: number) {
    return this.ordersService.getOrderById(orderId);
  }

  @Post()
  createOrder(@Body() order: CreateOrderDTO) {
    return this.ordersService.createOrder(order);
  }

  @UseGuards(JwtAuthGuard, IsAdminGuard)
  @Put(':orderId/status/:statusId')
  updateOrderStatus(
    @Param('orderId') orderId: number,
    @Param('statusId') statusId: number,
  ) {
    return this.ordersService.updateProductStatus(orderId, Number(statusId));
  }
}
