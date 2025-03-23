import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,

} from 'class-validator';

export class SignInUserDto {
  @ApiProperty({
    type: String,
    description: 'Email of user',
    example: 'jhondoe02@gmail.com',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: 'password of user',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

}
