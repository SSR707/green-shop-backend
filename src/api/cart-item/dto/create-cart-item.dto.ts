import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsUUID, Min } from "class-validator";

export class CreateCartItemDto {
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


  @ApiProperty({
    type: String,
    description: 'Product id',
    example: 'd3b2b2b7-1b5e-4c5d-8f4d-2b2b2b7b1e4c',
  })
  @IsNotEmpty({
    message: JSON.stringify({
      type: 'product_id',
      message: 'product ID is required',
    }),
  })
  @IsUUID('4', {
    message: JSON.stringify({
      type: 'product_id',
      message: 'Invalid UUID format for product ID',
    }),
  })
  product_id: string;


  @ApiProperty({
    type: Number,
    description: 'Quantity of product',
    example: 10,
  })
  @IsNumber({}, { message: JSON.stringify({ type: 'quantity', message: 'Quantity must be a number' }) })
  @IsNotEmpty({ message: JSON.stringify({ type: 'quantity', message: 'Quantity is required' }) })
  @Min(1, { message: JSON.stringify({ type: 'quantity', message: 'Quantity must be at least 1' }) })
  quantity: number
}
