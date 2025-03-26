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
import { config } from 'src/config';
import { FileService } from 'src/infrastructure';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: CategoryRepository,
    private readonly fileService: FileService,
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

  async uploadImg(id: string, file: Express.Multer.File) {
    try {
      const currentCategory = await this.categoryRepository.findOne({
        where: { id },
      });
      if (!currentCategory) {
        throw new NotFoundException(`Product with id ${id} not found.`);
      }
      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new BadRequestException(
          'Only JPG, PNG and GIF files are allowed',
        );
      }
      const imageUrl = currentCategory.picture
        ? currentCategory.picture.replace(`${config.API_URL}/`, '')
        : '';

      // if (await this.fileService.existFile(imageUrl)) {
      //   await this.fileService.deleteFile(imageUrl);
      // }
      const uploadImg = await this.fileService.uploadFile(file, 'category');

      const imgPath = config.API_URL + '/' + uploadImg.path;
      await this.categoryRepository.update(currentCategory.id, {
        picture: imgPath,
        updated_at: Date.now(),
      });
      return {
        status_code: HttpStatus.OK,
        message: 'success',
        data: {
          image_url: imgPath,
        },
      };
    } catch (error) {
      throw new BadRequestException(`Error uploading image: ${error.message}`);
    }
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
