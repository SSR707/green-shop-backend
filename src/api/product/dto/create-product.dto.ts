import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { ProductDiscountEnum } from 'src/common';

export class CreateProductDto {
  @ApiProperty({
    type: String,
    description: 'Category id',
    example: 'd3b2b2b7-1b5e-4c5d-8f4d-2b2b2b7b1e4c',
  })
  @IsNotEmpty({
    message: JSON.stringify({
      type: 'category_id',
      message: 'Category ID is required',
    }),
  })
  @IsUUID('4', {
    message: JSON.stringify({
      type: 'category_id',
      message: 'Invalid UUID format for category ID',
    }),
  })
  category_id: string;

  @ApiProperty({
    type: String,
    description: 'Title of Product',
    example: 'Iphone',
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
    description: ' Picture of Product',
    example: '.jpg',
  })
  @IsString({
    message: JSON.stringify({
      type: 'picture',
      message: 'Picture must be a string',
    }),
  })
  @IsOptional()
  picture: string;

  @ApiProperty({
    type: String,
    description: 'Summary: of Product',
    example: 'summary...',
  })
  @IsString({
    message: JSON.stringify({
      type: 'summary',
      message: 'Summary must be a string',
    }),
  })
  @IsOptional()
  summary: string;

  @ApiProperty({
    type: String,
    description: 'Description of Product',
    example: 'description...',
  })
  @IsString({
    message: JSON.stringify({
      type: 'description',
      message: 'Description must be a string',
    }),
  })
  @IsOptional()
  description: string;

  @ApiProperty({
    type: Number,
    description: 'Price of Product',
    example: 10000,
  })
  @IsNumber(
    {},
    {
      message: JSON.stringify({
        type: 'price',
        message: 'Price must be a number',
      }),
    },
  )
  @IsNotEmpty({
    message: JSON.stringify({ type: 'price', message: 'Price is required' }),
  })
  @IsPositive({
    message: JSON.stringify({
      type: 'price',
      message: 'Price must be a positive number',
    }),
  })
  price: number;

  @ApiProperty({
    enum: ProductDiscountEnum,
    description: 'Discount type of Product',
    example: 'fixed',
  })
  @IsEnum(ProductDiscountEnum, {
    message: JSON.stringify({
      type: 'discount_type',
      message: 'Discount type must be either "fixed" or "percentage"',
    }),
  })
  @IsOptional()
  discount_type: ProductDiscountEnum;

  @ApiProperty({
    type: Number,
    description: 'Discount Value of Product',
    example: 20,
  })
  @IsNumber(
    {},
    {
      message: JSON.stringify({
        type: 'discount_value',
        message: 'Discount value must be a number',
      }),
    },
  )
  @IsOptional()
  discount_value: number;

  @ApiProperty({
    type: String,
    description: 'Tags of Product',
    example: 'tags...',
  })
  @IsString({
    message: JSON.stringify({ type: 'tags', message: 'Tags must be a string' }),
  })
  @IsOptional()
  tags: string;
}
