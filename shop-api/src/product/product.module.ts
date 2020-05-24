import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { ProductType } from './models/product-type.model';
import { CharacteristicDescriptor } from './models/characteristic-descriptor.model';
import { Characteristic } from './models/characteristic.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Product,
      ProductType,
      CharacteristicDescriptor,
      Characteristic,
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService, SequelizeModule],
})
export class ProductModule {}
