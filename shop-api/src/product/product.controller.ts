import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProductTypeDTO } from './dto/create-product-type.dto';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { IProductsQuery } from './product.interfaces';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IsAdminGuard } from '../auth/guards/is-admin.guard';
import * as mysql from 'mysql2/promise'

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}


  @Get('/popular')
  async getPopularProducts(@Query() query) {
    const connection = await mysql.createConnection({
      host: 'mysql',
      user: 'root',
      password: 'root',
      database: 'app'
    })

    const [rows] = await connection.execute(`
      SELECT name, SUM(priceAtTheMomentOfOrder * amount) as totalRevenue FROM Products
      INNER JOIN OrderProducts on OrderProducts.productId = Products.id
      INNER JOIN Orders as o on OrderProducts.orderId = o.id
      GROUP BY productId, name, o.createdAt
      HAVING o.createdAt < ? && o.createdAt > ?
      ORDER BY totalRevenue ASC;
    `, [query.created_lt, query.created_gt ])


    await connection.close();

    return rows;
  }


  @Get('types')
  getProductsTypes() {
    return this.productService.getTypes();
  }

  @UseGuards(JwtAuthGuard, IsAdminGuard)
  @Post('types')
  async createProductType(@Body() productType: CreateProductTypeDTO) {
    console.log(productType);

    const createdProductType = await this.productService.createProductType(
      productType,
    );
    return createdProductType.get({ plain: true });
  }

  @Get()
  getProducts(@Query() query: IProductsQuery) {
    return this.productService.getProducts(query);
  }

  @Put()
  updateProduct(@Body() product: CreateProductDTO) {
    return this.productService.updateProduct(product);
  }

  @Get('max-price')
  getProductPrice() {
    return this.productService.getMaxPrice();
  }

  @Get(':productId')
  getProduct(@Param('productId') id: number) {
    return this.productService.getProductById(id);
  }

  @Get('/types/:typeId')
  getProductTypeById(@Param('typeId') typeId: number) {
    return this.productService.getProductById(typeId);
  }

  @UseGuards(JwtAuthGuard, IsAdminGuard)
  @Post()
  async createProduct(@Body() product: CreateProductDTO) {
    const createdProduct = await this.productService.createProduct(product);
    return createdProduct.get({ plain: true });
  }

  @Post('images')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: process.cwd() + '/public/images',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file) {
    return {
      imagePath:
        'http://localhost:3000' +
        file.path.replace(process.cwd() + '/public', ''),
    };
  }
}
