import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ProductEntity,
  ProductRepository,
  ReviewsEntity,
  ReviewsRepository,
} from 'src/core';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewsEntity)
    private reviewsRepository: ReviewsRepository,
    @InjectRepository(ProductEntity)
    private productRepository: ProductRepository,
  ) {}
  async create(user_id: string, createReviewDto: CreateReviewDto) {
    const currentProduct = await this.productRepository.findOne({
      where: { id: createReviewDto.product_id },
    });
    if (!currentProduct) {
      throw new NotFoundException(
        `Product with id ${createReviewDto.product_id} not found.`,
      );
    }
    const review = this.reviewsRepository.create({
      user_id,
      ...createReviewDto,
    });
    await this.reviewsRepository.save(review);
    return {
      status_code: HttpStatus.CREATED,
      message: 'success',
      data: review,
    };
  }

  async findAll() {
    const reviews = await this.reviewsRepository.find({
      relations: ['user', 'product'],
    });
    return {
      status_code: HttpStatus.OK,
      message: 'success',
      data: reviews,
    };
  }

  async findOne(id: string) {
    const review = await this.reviewsRepository.findOne({
      where: { id },
      relations: ['user', 'product'],
    });
    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found.`);
    }
    return {
      status_code: HttpStatus.OK,
      message: 'success',
      data: review,
    };
  }

  async findByProductId(id: string) {
    const currentProduct = await this.productRepository.findOne({
      where: { id },
    });
    if (!currentProduct) {
      throw new NotFoundException(`Product with id ${id} not found.`);
    }
    const reviews = await this.reviewsRepository.find({
      where: { product_id: id },
    });
    return {
      status_code: HttpStatus.OK,
      message: 'success',
      data: reviews,
    };
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    try {
      const currentReview = await this.reviewsRepository.findOne({
        where: { id },
      });
      if (!currentReview) {
        throw new NotFoundException(`Review with id ${id} not found.`);
      }
      await this.reviewsRepository.update(id, {
        ...updateReviewDto,
        updated_at: Date.now(),
      });
      return {
        status_code: HttpStatus.OK,
        message: 'success',
      };
    } catch (error) {
      throw new BadRequestException(`Error on update reviews: ${error}`);
    }
  }

  async remove(id: string) {
    try {
      const currentReview = await this.reviewsRepository.findOne({
        where: { id },
      });
      if (!currentReview) {
        throw new NotFoundException(`Review with id ${id} not found.`);
      }
      await this.reviewsRepository.delete(id);
      return {
        status_code: HttpStatus.OK,
        message: 'success',
      };
    } catch (error) {
      throw new BadRequestException(`Error on delete reviews: ${error}`);
    }
  }
}
