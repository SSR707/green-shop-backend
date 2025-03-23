import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    type: String,
    description: 'Title of Category',
    example: 'Products',
  })
  @IsString({
    message: JSON.stringify({
      type: 'name',
      message: 'Category name must be a string',
    }),
  })
  @IsNotEmpty({
    message: JSON.stringify({
      type: 'name',
      message: 'Category name is required',
    }),
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Description of Category',
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
    type: String,
    description: 'Tag of Category',
    example: 'Tag...',
  })
  @IsString({ message: JSON.stringify({ type: 'tag', message: 'Tag must be a string' }) })
  @IsOptional()
  tag: string;
}
