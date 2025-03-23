import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { config } from 'src/config';
import {
  CategoryEntity,
  CategoryRepository,
  ProductEntity,
  ProductRepository,
} from 'src/core';
import { FileService } from 'src/infrastructure';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: ProductRepository,
    @InjectRepository(CategoryEntity)
    private cateoryRepository: CategoryRepository,
    private readonly fileService: FileService,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const currentCategory = await this.cateoryRepository.findOne({
        where: { id: createProductDto.category_id },
      });
      if (!currentCategory) {
        throw new NotFoundException(
          `Category with id ${createProductDto.category_id} not found.`,
        );
      }
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);
      return {
        status_code: HttpStatus.CREATED,
        message: 'success',
        data: product,
      };
    } catch (error) {
      throw new BadRequestException(`Product create error: ${error}`);
    }
  }

  async findAll() {
    const products = await this.productRepository.find({
      relations: ['category', 'reviews'],
    });
    return {
      status_code: HttpStatus.OK,
      message: 'success',
      data: products,
    };
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category', 'reviews'],
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found.`);
    }
    return {
      status_code: HttpStatus.OK,
      message: 'success',
      data: product,
    };
  }

  async uploadImg(id: string, file: Express.Multer.File) {
    try {
      const currentProduct = await this.productRepository.findOne({
        where: { id },
      });
      if (!currentProduct) {
        throw new NotFoundException(`Product with id ${id} not found.`);
      }
      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new BadRequestException(
          'Only JPG, PNG and GIF files are allowed',
        );
      }
      const imageUrl = currentProduct.picture
        ? currentProduct.picture.replace(`${config.API_URL}/`, '')
        : '';

      if (await this.fileService.existFile(imageUrl)) {
        await this.fileService.deleteFile(imageUrl);
      }
      const uploadImg = await this.fileService.uploadFile(file, 'products');

      const imgPath = config.API_URL + '/' + uploadImg.path;
      await this.productRepository.update(currentProduct.id, {
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

  async update(id: string, updateProductDto: UpdateProductDto) {
    const currentProduct = await this.productRepository.findOne({
      where: { id },
    });
    if (!currentProduct) {
      throw new NotFoundException(`Product with id ${id} not found.`);
    }
    await this.productRepository.update(id, {
      ...updateProductDto,
      updated_at: Date.now(),
    });
    return {
      status_code: HttpStatus.OK,
      message: 'success',
    };
  }

  async remove(id: string) {
    const currentProduct = await this.productRepository.findOne({
      where: { id },
    });
    if (!currentProduct) {
      throw new NotFoundException(`Product with id ${id} not found.`);
    }
    await this.productRepository.delete(id);
    return {
      status_code: HttpStatus.OK,
      message: 'success',
    };
  }
}
