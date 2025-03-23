import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AddressEntity,
  AddressRepository,
  UserEntity,
  UserRepository,
} from 'src/core';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private addressRepository: AddressRepository,
    @InjectRepository(UserEntity)
    private userRepository: UserRepository,
  ) {}
  async create(user_id: string, createAddressDto: CreateAddressDto) {
    try {
      const currentUser = await this.userRepository.findOne({
        where: { id: user_id },
      });
      if (!currentUser) {
        throw new NotFoundException(`User with id ${user_id} not found.`);
      }
      const address = this.addressRepository.create({
        user_id,
        ...createAddressDto,
      });
      await this.addressRepository.save(address);
      return {
        status_code: HttpStatus.CREATED,
        message: 'success',
        data: address,
      };
    } catch (error) {
      throw new BadRequestException(
        `Error creating of address error:${error} `,
      );
    }
  }

  async findAll() {
    const address = await this.addressRepository.find({ relations: ['user'] });
    return {
      status_code: HttpStatus.OK,
      message: 'success',
      data: address,
    };
  }

  async findOne(id: string) {
    const address = await this.addressRepository.findOne({
      where: { id },
    });
    if (!address) {
      throw new NotFoundException(`Address with id ${id} not found.`);
    }
    return {
      status_code: HttpStatus.OK,
      message: 'success',
      data: address,
    };
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    const currentAddress = await this.addressRepository.findOne({
      where: { id },
    });
    if (!currentAddress) {
      throw new NotFoundException(`Address with id ${id} not found.`);
    }
    await this.addressRepository.update(id, {
      ...updateAddressDto,
      updated_at: Date.now(),
    });
    return {
      status_code: HttpStatus.OK,
      message: 'success',
    };
  }

  async remove(id: string) {
    const currentAddress = await this.addressRepository.findOne({
      where: { id },
    });
    if (!currentAddress) {
      throw new NotFoundException(`Address with id ${id} not found.`);
    }
    await this.addressRepository.delete(id);
    return {
      status_code: HttpStatus.OK,
      message: 'success',
    };
  }
}
