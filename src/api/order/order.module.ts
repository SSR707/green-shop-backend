import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity, OrderEntity } from 'src/core';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, CartEntity])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
