import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { RoleEnum } from 'src/common';

export class SignUpUserDto {
  @ApiProperty({
    type: String,
    description: 'Fullname of user',
    example: 'Store001',
  })
  @IsString({
    message: JSON.stringify({
      type: 'fullname',
      message: 'Fullname must be a string',
    }),
  })
  @IsNotEmpty({
    message: JSON.stringify({
      type: 'fullname',
      message: 'Fullname is required',
    }),
  })
  fullname: string;

  @ApiProperty({
    type: String,
    description: 'Email of user',
    example: 'jhondoe02@gmail.com',
  })
  @IsString({
    message: JSON.stringify({
      type: 'email',
      message: 'Email must be a string',
    }),
  })
  @IsEmail(
    {},
    {
      message: JSON.stringify({
        type: 'email',
        message: 'Invalid email format',
      }),
    },
  )
  @IsNotEmpty({
    message: JSON.stringify({ type: 'email', message: 'Email is required' }),
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'password of user',
    example: 'password123',
  })
  @IsString({
    message: JSON.stringify({
      type: 'password',
      message: 'Password must be a string',
    }),
  })
  @IsStrongPassword(
    {},
    {
      message: JSON.stringify({
        type: 'password',
        message: 'Password is not strong enough',
      }),
    },
  )
  @IsNotEmpty({
    message: JSON.stringify({
      type: 'password',
      message: 'Password is required',
    }),
  })
  password: string;

  @ApiProperty({
    type: String,
    description: 'Avatar of user',
    example: '.jpg',
  })
  @IsString({
    message: JSON.stringify({
      type: 'avatar',
      message: 'Avatar must be a string',
    }),
  })
  @IsOptional()
  avatar: string;

  @ApiProperty({
    type: String,
    description: 'Phone Number of user',
    example: '+998997777777',
  })
  @IsString({
    message: JSON.stringify({
      type: 'phone_number',
      message: 'Phone number must be a string',
    }),
  })
  @IsPhoneNumber(undefined, {
    message: JSON.stringify({
      type: 'phone_number',
      message: 'Invalid phone number format',
    }),
  })
  @IsNotEmpty({
    message: JSON.stringify({
      type: 'phone_number',
      message: 'Phone number is required',
    }),
  })
  phone_number: string;

  @ApiProperty({
    type: String,
    description: 'User Role',
    enum: RoleEnum,
    default: RoleEnum.USER,
  })
  @IsString({
    message: JSON.stringify({ type: 'role', message: 'Role must be a string' }),
  })
  @IsOptional()
  role: RoleEnum;
}
