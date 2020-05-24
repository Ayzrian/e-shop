import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "mysql",
      host: "mysql",
      port: 3306,
      username: "root",
      password: "root",
      database: "app",
      autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ProductModule,
    ServeStaticModule.forRoot({
      rootPath: 'public'
    }),
    OrdersModule
  ],
})
export class AppModule {}
