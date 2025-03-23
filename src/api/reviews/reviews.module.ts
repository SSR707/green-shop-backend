import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity, ReviewsEntity } from 'src/core';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, ReviewsEntity])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
