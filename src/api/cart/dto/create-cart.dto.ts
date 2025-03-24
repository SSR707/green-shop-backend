import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateCartDto {
  @ApiProperty({
    type: Number,
    description: 'total of Cart',
    example: 10000,
  })
  @IsNumber(
    {},
    {
      message: JSON.stringify({
        type: 'total',
        message: 'total must be a number',
      }),
    },
  )
  @IsNotEmpty({
    message: JSON.stringify({ type: 'total', message: 'total is required' }),
  })
  @IsPositive({
    message: JSON.stringify({
      type: 'total',
      message: 'total must be a positive number',
    }),
  })
  total: number;
}
