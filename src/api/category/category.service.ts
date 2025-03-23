import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity, CategoryRepository } from 'src/core';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: CategoryRepository,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = this.categoryRepository.create(createCategoryDto);
      await this.categoryRepository.save(category);
      return {
        status_code: HttpStatus.CREATED,
        message: 'Created',
        data: category,
      };
    } catch (error) {
      throw new BadRequestException(`Category create error: ${error}`);
    }
  }

  async findAll() {
    const categorys = await this.categoryRepository.find({
      relations: ['products', 'products.reviews'],
    });
    return {
      status_code: HttpStatus.OK,
      message: 'success',
      data: categorys,
    };
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['products', 'products.reviews'],
    });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found.`);
    }
    return {
      status_code: HttpStatus.OK,
      message: 'success',
      data: category,
    };
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const currentCategory = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!currentCategory) {
      throw new NotFoundException(`Category with id ${id} not found.`);
    }
    await this.categoryRepository.update(id, {
      ...updateCategoryDto,
      updated_at: Date.now(),
    });
    return {
      status_code: HttpStatus.OK,
      message: 'success',
    };
  }

  async remove(id: string) {
    const currentCategory = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!currentCategory) {
      throw new NotFoundException(`Category with id ${id} not found.`);
    }
    await this.categoryRepository.delete(id);
    return {
      status_code: HttpStatus.OK,
      message: 'success',
    };
  }
}
