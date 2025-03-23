import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class VerifyUserDto {
  @ApiProperty({
    type: String,
    description: 'User Email',
    example: 'jhondoe@gmail.com',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: Number,
    description: 'Otp Code',
    example: '0000',
  })
  @IsNumber()
  @IsNotEmpty()
  otp_code: number;
}
