import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductType } from './models/product-type.model';
import { CreateProductTypeDTO } from './dto/create-product-type.dto';
import { CharacteristicDescriptor } from './models/characteristic-descriptor.model';
import { CreateProductDTO } from './dto/create-product.dto';
import { Product } from './models/product.model';
import { Characteristic } from './models/characteristic.model';
import { IProductsQuery } from './product.interfaces';
import { Op } from 'sequelize';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductType) private productTypeModel: typeof ProductType,
    @InjectModel(Product) private productModel: typeof Product,
  ) {
  }

  createProductType(product: CreateProductTypeDTO): Promise<ProductType> {
    return this.productTypeModel.create(product, {
      include: [CharacteristicDescriptor],
    });
  }

  createProduct(product: CreateProductDTO): Promise<Product> {
    return this.productModel.create(product, {
      include: [Characteristic],
    });
  }

  getProducts(query?: IProductsQuery): Promise<Product[]> {
    const options: any = {
      include: [ProductType],
    };

    const where: any = {};

    if (query) {
      const { name, brand, typeId, limit, offset } = query;

      if (name) {
        where.name = {
          [Op.like]: `%${name}%`,
        };
      }

      if (brand) {
        where.brand = {
          [Op.like]: `%${brand}%`,
        };
      }

      if (typeId) {
        where.typeId = typeId;
      }

      if (limit) {
        options.limit = Number(limit);
      }

      if (offset) {
        options.offset = Number(offset);
      }
    }

    return this.productModel.findAll({
      ...options,
      where,
    });
  }

  getProductById(id: number): Promise<Product> {
    return this.productModel.findByPk(id, {
      include: [
        {
          model: Characteristic,
          include: [CharacteristicDescriptor],
        },
      ],
    });
  }

  getTypes() {
    return this.productTypeModel.findAll({
      include: [CharacteristicDescriptor],
    });
  }
}
