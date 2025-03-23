import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard, UserID } from 'src/common';

@ApiTags('Address Api')
@ApiBearerAuth()
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiOperation({
    summary: 'Create Address',
  })
  @ApiOperation({
    summary: 'Create a new address',
    description: 'This endpoint allows a user to create a new address.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Address created successfully',
    schema: {
      example: {
        status_code: HttpStatus.CREATED,
        message: 'Address created successfully',
        data: {
          id: '4414e170-64c7-4d87-9daa-2cc6752818f4',
          created_at: '1742548077907',
          updated_at: '1742552633357',
          title: 'Home Address',
          address_line_1: 'Amir Temur ko‘chasi, 45-uy',
          address_line_2: 'Shayxontohur tumani',
          country: 'O‘zbekiston',
          city: 'Toshkent',
          postal_code: '100011',
          phone_number: '+998901234567',
          landmark: 'Magic City yaqinida',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Failed fetchin stores',
    schema: {
      example: {
        status_code: HttpStatus.BAD_REQUEST,
        message: 'Error on fetching stores',
      },
    },
  })
  @Post()
  create(@UserID() id: string, @Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(id, createAddressDto);
  }

  @ApiOperation({
    summary: 'Get all addresses',
    description: 'Retrieve a list of all addresses available in the system.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of addresses fetched successfully',
    schema: {
      example: {
        status_code: HttpStatus.OK,
        message: 'Addresses retrieved successfully',
        data: [
          {
            id: '4414e170-64c7-4d87-9daa-2cc6752818f4',
            created_at: '1742548077907',
            updated_at: '1742552633357',
            title: 'Home Address',
            address_line_1: 'Amir Temur ko‘chasi, 45-uy',
            address_line_2: 'Shayxontohur tumani',
            country: 'O‘zbekiston',
            city: 'Toshkent',
            postal_code: '100011',
            phone_number: '+998901234567',
            landmark: 'Magic City yaqinida',
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Unauthorized access',
    schema: {
      example: {
        status_code: HttpStatus.FORBIDDEN,
        message: 'Access denied',
      },
    },
  })
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.addressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(id);
  }
}
