import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptEncryption } from 'src/infrastructure/lib/bcrypt/bcrypt';
import { config } from 'src/config';
import { UserEntity, UserRepository } from 'src/core';
import { FileService } from 'src/infrastructure';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: UserRepository,
    private readonly fileService: FileService,
  ) {}
  async findAll() {
    const users = await this.userRepository.find({
      where: { is_active: true },
      relations: ['address', 'reviews'],
    });
    return {
      status_code: HttpStatus.OK,
      message: 'success',
      data: users,
    };
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['address', 'reviews'],
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }
    return {
      status_code: HttpStatus.OK,
      message: 'success',
      data: user,
    };
  }
  async getProfile(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: {
        id: true,
        fullname: true,
        email: true,
        avatar: true,
        phone_number: true,
        created_at: true,
        updated_at: true,
      },
      relations: ['address'],
    });
    return {
      status_code: HttpStatus.OK,
      message: 'success',
      data: user,
    };
  }
  async uploadImg(id: string, file: Express.Multer.File) {
    try {
      if (!id || !file) {
        throw new BadRequestException('Debtor ID and file are required');
      }
      const currentUser = await this.userRepository.findOne({ where: { id } });
      if (!currentUser) {
        throw new NotFoundException(`User with id ${id} not found.`);
      }

      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new BadRequestException(
          'Only JPG, PNG and GIF files are allowed',
        );
      }

      const imageUrl = currentUser.avatar.replace(`${config.API_URL}/`, '');
      if (await this.fileService.existFile(imageUrl)) {
        await this.fileService.deleteFile(imageUrl);
      }

      const uploadedFile = await this.fileService.uploadFile(file, 'users');

      if (!uploadedFile || !uploadedFile.path) {
        throw new BadRequestException('Failed to upload image');
      }
      const pathImg = config.API_URL + '/' + uploadedFile.path;
      await this.userRepository.update(id, {
        avatar: pathImg,
        updated_at: Date.now(),
      });

      return {
        status_code: HttpStatus.OK,
        message: 'Image uploaded successfully',
        data: {
          image_url: pathImg,
        },
      };
    } catch (error) {
      throw new BadRequestException(`Error uploading image: ${error.message}`);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
      const currentUser = await this.userRepository.findOne({ where: { id } });
      if (!currentUser) {
        throw new NotFoundException(`User with id ${id} not found.`);
      }
      if (updateUserDto.password) {
        updateUserDto.password = await BcryptEncryption.encrypt(
          updateUserDto.password,
        );
      }
      await this.userRepository.update(id, {
        ...updateUserDto,
        updated_at: Date.now(),
      });
      return {
        status_code: HttpStatus.OK,
        message: 'success',
      };

  }

  async remove(id: string) {

      const currentUser = await this.userRepository.findOne({ where: { id } });
      if (!currentUser) {
        throw new NotFoundException(`User with id ${id} not found.`);
      }
      await this.userRepository.delete(id);
      return {
        status_code: HttpStatus.OK,
        message: 'success',
      };

  }
}
