import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { config } from 'src/config';
import { BannerEntity } from 'src/core';
import { BannerRepository } from 'src/core/repository/banner.repository';
import { FileService } from 'src/infrastructure';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(BannerEntity) private bannerRepository: BannerRepository,
    private readonly fileService: FileService,
  ) {}

  async uploadImg(file: Express.Multer.File) {
    try {
      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new BadRequestException(
          'Only JPG, PNG and GIF files are allowed',
        );
      }
      const uploadImg = await this.fileService.uploadFile(file, 'banner');

      const imgPath = config.API_URL + '/' + uploadImg.path;
      const banner = this.bannerRepository.create({ image: imgPath });
      await this.bannerRepository.save(banner);
      return {
        status_code: HttpStatus.CREATED,
        message: 'success',
        data: {
          image_url: imgPath,
        },
      };
    } catch (error) {
      throw new BadRequestException(`Error uploading image: ${error.message}`);
    }
  }
  async findAll() {
    const banners = await this.bannerRepository.find();
    return {
      status_code: HttpStatus.OK,
      message: 'success',
      data: banners,
    };
  }

  async findOne(id: string) {
    const banner = await this.bannerRepository.findOne({ where: { id } });
    if (!banner) {
      throw new NotFoundException(`Banner with id ${id} not found.`);
    }
    return {
      status_code: HttpStatus.OK,
      message: 'success',
      data: banner,
    };
  }

  async remove(id: string) {
    const currentBanner = await this.bannerRepository.findOne({
      where: { id },
    });
    if (!currentBanner) {
      throw new NotFoundException(`Banner with id ${id} not found.`);
    }
    const imageUrl = currentBanner.image
      ? currentBanner.image.replace(`${config.API_URL}/`, '')
      : '';

    if (await this.fileService.existFile(imageUrl)) {
      await this.fileService.deleteFile(imageUrl);
    }
    await this.bannerRepository.delete(id);
    return {
      status_code: HttpStatus.OK,
      message: 'success',
    };
  }
}
