import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    type: String,
    description: 'Product id',
    example: 'd3b2b2b7-1b5e-4c5d-8f4d-2b2b2b7b1e4c',
  })
  @IsUUID('4', { message: JSON.stringify({ type: 'product_id', message: 'Product ID must be a valid UUID' }) })
  @IsNotEmpty({ message: JSON.stringify({ type: 'product_id', message: 'Product ID is required' }) })
  product_id: string;

  @ApiProperty({
    type: Number,
    description: 'Product rating',
    example: 4.5,
  })
  @IsNumber({}, { message: JSON.stringify({ type: 'rating', message: 'Rating must be a number' }) })
  @IsOptional()
  @Min(0, { message: JSON.stringify({ type: 'rating', message: 'Rating cannot be less than 0' }) })
  @Max(5, { message: JSON.stringify({ type: 'rating', message: 'Rating cannot be more than 5' }) })
  rating: number;


  @ApiProperty({
    type: String,
    description: 'Product comment',
    example: 'good',
  })
  @IsString({ message: JSON.stringify({ type: 'comment', message: 'Comment must be a string' }) })
  @IsNotEmpty({ message: JSON.stringify({ type: 'comment', message: 'Comment is required' }) })
  comment: string;
}
