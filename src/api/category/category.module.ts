import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/core';
import { FileModule } from 'src/infrastructure';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity]), FileModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
