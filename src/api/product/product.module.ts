import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity, ProductEntity } from 'src/core';
import { FileModule } from 'src/infrastructure';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity]),
    FileModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
