import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({
    type: String,
    description: 'Title of user address',
    example: 'Title..',
  })
  @IsString({
    message: JSON.stringify({
      type: 'title',
      message: 'Title must be a string',
    }),
  })
  @IsNotEmpty({
    message: JSON.stringify({ type: 'title', message: 'Title is required' }),
  })
  title: string;

  @ApiProperty({
    type: String,
    description: 'Address Line 1 of user address',
    example: 'Address Line 1 ...',
  })
  @IsString({
    message: JSON.stringify({
      type: 'address_line_1',
      message: 'Address Line 1 must be a string',
    }),
  })
  @IsNotEmpty({
    message: JSON.stringify({
      type: 'address_line_1',
      message: 'Address Line 1 is required',
    }),
  })
  address_line_1: string;

  @ApiProperty({
    type: String,
    description: 'Address Line 2 of user address',
    example: 'Address Line 2...',
  })
  @IsString({
    message: JSON.stringify({
      type: 'address_line_2',
      message: 'Address Line 2 must be a string',
    }),
  })
  @IsOptional()
  address_line_2: string;

  @ApiProperty({
    type: String,
    description: 'Country of user address',
    example: 'Country ...',
  })
  @IsString({
    message: JSON.stringify({
      type: 'country',
      message: 'Country must be a string',
    }),
  })
  @IsNotEmpty({
    message: JSON.stringify({
      type: 'country',
      message: 'Country is required',
    }),
  })
  country: string;

  @ApiProperty({
    type: String,
    description: 'City of user address',
    example: 'City ...',
  })
  @IsString({
    message: JSON.stringify({ type: 'city', message: 'City must be a string' }),
  })
  @IsNotEmpty({
    message: JSON.stringify({ type: 'city', message: 'City is required' }),
  })
  city: string;

  @ApiProperty({
    type: String,
    description: 'Postal Code of user address',
    example: '354654-5455',
  })
  @IsString({
    message: JSON.stringify({
      type: 'postal_code',
      message: 'Postal Code must be a string',
    }),
  })
  @IsNotEmpty({
    message: JSON.stringify({
      type: 'postal_code',
      message: 'Postal Code is required',
    }),
  })
  postal_code: string;

  @ApiProperty({
    type: String,
    description: 'phone_number of user address',
    example: '+998998255556',
  })
  @IsString({
    message: JSON.stringify({
      type: 'phone_number',
      message: 'Phone Number must be a string',
    }),
  })
  @IsPhoneNumber('UZ', {
    message: JSON.stringify({
      type: 'phone_number',
      message: 'Phone Number is not valid',
    }),
  })
  @IsNotEmpty({
    message: JSON.stringify({
      type: 'phone_number',
      message: 'Phone Number is required',
    }),
  })
  phone_number: string;

  @ApiProperty({
    type: String,
    description: 'Landmark of user address',
    example: 'Landmark',
  })
  @IsString({
    message: JSON.stringify({
      type: 'landmark',
      message: 'Landmark must be a string',
    }),
  })
  @IsOptional()
  landmark: string;
}
