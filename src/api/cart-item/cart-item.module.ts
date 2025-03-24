import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity, CartItemEntity, ProductEntity } from 'src/core';

@Module({
  imports: [TypeOrmModule.forFeature([CartItemEntity , CartEntity , ProductEntity])],
  controllers: [CartItemController],
  providers: [CartItemService],
})
export class CartItemModule {}
