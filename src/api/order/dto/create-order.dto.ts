import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    type: String,
    description: 'Cart id',
    example: 'd3b2b2b7-1b5e-4c5d-8f4d-2b2b2b7b1e4c',
  })
  @IsNotEmpty({
    message: JSON.stringify({
      type: 'cart_id',
      message: 'cart ID is required',
    }),
  })
  @IsUUID('4', {
    message: JSON.stringify({
      type: 'cart_id',
      message: 'Invalid UUID format for cart ID',
    }),
  })
  cart_id: string;
}
