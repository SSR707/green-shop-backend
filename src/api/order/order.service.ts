import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CartEntity,
  CartRepository,
  OrderEntity,
  OrderRepository,
} from 'src/core';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity) private orderRepository: OrderRepository,
    @InjectRepository(CartEntity) private cartRepository: CartRepository,
  ) {}
  async create(id: string, createOrderDto: CreateOrderDto) {
    const currentCart = await this.cartRepository.findOne({
      where: { id: createOrderDto.cart_id },
    });
    if (!currentCart) {
      throw new NotFoundException(
        `Cart with id ${createOrderDto.cart_id} not found.`,
      );
    }
    const order = this.orderRepository.create({
      user_id: id,
      ...createOrderDto,
    });
    await this.orderRepository.save(order);
    return {
      status_code: HttpStatus.CREATED,
      message: 'success',
      data: order,
    };
  }

  async findAll() {
    const orders = await this.orderRepository.find({
      relations: ['cart', 'user'],
    });
    return {
      status_code: HttpStatus.OK,
      message: 'success',
      data: orders,
    };
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['cart', 'user'],
    });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found.`);
    }
    return {
      status_code: HttpStatus.OK,
      message: 'success',
      data: order,
    };
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const currentOrder = await this.orderRepository.findOne({ where: { id } });
    if (!currentOrder) {
      throw new NotFoundException(`Order with id ${id} not found.`);
    }
    await this.orderRepository.update(id, {
      ...updateOrderDto,
      updated_at: Date.now(),
    });
    return {
      status_code: HttpStatus.OK,
      message: 'success',
    };
  }

  async remove(id: string) {
    const currentOrder = await this.orderRepository.findOne({ where: { id } });
    if (!currentOrder) {
      throw new NotFoundException(`Order with id ${id} not found.`);
    }
    await this.orderRepository.delete(id);
    return {
      status_code: HttpStatus.OK,
      message: 'success',
    };
  }
}
