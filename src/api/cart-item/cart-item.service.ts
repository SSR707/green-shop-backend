import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CartEntity,
  CartItemEntity,
  CartItemRepository,
  CartRepository,
  ProductEntity,
  ProductRepository,
} from 'src/core';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItemEntity)
    private cartItemRepository: CartItemRepository,
    @InjectRepository(CartEntity)
    private cartRepository: CartRepository,
    @InjectRepository(ProductEntity)
    private productRepository: ProductRepository,
  ) {}
  async create(createCartItemDto: CreateCartItemDto) {
    const currentCart = await this.cartRepository.findOne({
      where: { id: createCartItemDto.cart_id },
    });
    if (!currentCart) {
      throw new NotFoundException(
        `Cart with id ${createCartItemDto.cart_id} not found.`,
      );
    }
    const currentProduct = await this.productRepository.findOne({
      where: { id: createCartItemDto.product_id },
    });
    if (!currentProduct) {
      throw new NotFoundException(
        `Product with id ${createCartItemDto.product_id} not found.`,
      );
    }
    const cartItem = this.cartItemRepository.create(createCartItemDto);
    await this.cartItemRepository.save(cartItem);
    return {
      status_code: HttpStatus.CREATED,
      message: 'success',
      data: cartItem,
    };
  }

  async findAll() {
    const cartItems = await this.cartItemRepository.find({
      relations: ['product', 'cart'],
    });
    return {
      status_code: HttpStatus.OK,
      message: 'success',
      data: cartItems,
    };
  }

  async findOne(id: string) {
    const cartItem = await this.cartItemRepository.findOne({
      where: { id },
      relations: ['product', 'cart'],
    });
    if (!cartItem) {
      throw new NotFoundException(`Cart Item with id ${id} not found.`);
    }
    return {
      status_code: HttpStatus.OK,
      message: 'success',
      data: cartItem,
    };
  }

  async update(id: string, updateCartItemDto: UpdateCartItemDto) {
    const currentCartItem = await this.cartItemRepository.findOne({
      where: { id },
    });
    if (!currentCartItem) {
      throw new NotFoundException(`Cart Item with id ${id} not found.`);
    }
    await this.cartItemRepository.update(id, {
      ...updateCartItemDto,
      updated_at: Date.now(),
    });
    return {
      status_code: HttpStatus.OK,
      message: 'success',
    };
  }

  async remove(id: string) {
    const currentCartItem = await this.cartItemRepository.findOne({
      where: { id },
    });
    if (!currentCartItem) {
      throw new NotFoundException(`Cart Item with id ${id} not found.`);
    }
    await this.cartItemRepository.delete(id);
    return {
      status_code: HttpStatus.OK,
      message: 'success',
    };
  }
}
