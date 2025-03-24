import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity, CartRepository } from 'src/core';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity) private cartRepository: CartRepository,
  ) {}
  async create(id: string, createCartDto: CreateCartDto) {
    const cart = this.cartRepository.create({ user_id: id, ...createCartDto });
    await this.cartRepository.save(cart);
    return {
      status_code: HttpStatus.CREATED,
      message: 'success',
      data: cart,
    };
  }

  async findAll() {
    const carts = await this.cartRepository.find({
      relations: ['user', 'order', 'cart_item'],
    });
    return {
      status_code: HttpStatus.OK,
      message: 'success',
      data: carts,
    };
  }

  async findOne(id: string) {
    const cart = await this.cartRepository.findOne({
      where: { id },
      relations: ['user', 'order', 'cart_item'],
    });
    if (!cart) {
      throw new NotFoundException(`Cart with id ${id} not found.`);
    }
    return {
      status_code: HttpStatus.OK,
      message: 'success',
      data: cart,
    };
  }

  async findUserCart(id: string) {
    const cart = await this.cartRepository.findOne({
      where: { user_id: id },
      relations: ['user', 'order', 'cart_item' , "cart_item.product"],
    });
    if (!cart) {
      throw new NotFoundException(`Cart with id ${id} not found.`);
    }
    return {
      status_code: HttpStatus.OK,
      message: 'success',
      data: cart,
    };
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    const currentCart = await this.cartRepository.findOne({ where: { id } });
    if (!currentCart) {
      throw new NotFoundException(`Cart with id ${id} not found.`);
    }
    await this.cartRepository.update(id, {
      ...updateCartDto,
      updated_at: Date.now(),
    });
    return {
      status_code: HttpStatus.OK,
      message: 'success',
    };
  }

  async remove(id: string) {
    const currentCart = await this.cartRepository.findOne({ where: { id } });
    if (!currentCart) {
      throw new NotFoundException(`Cart with id ${id} not found.`);
    }
    await this.cartRepository.delete(id);
    return {
      status_code: HttpStatus.OK,
      message: 'success',
    };
  }
}
