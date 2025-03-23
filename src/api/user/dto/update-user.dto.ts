import { PartialType } from '@nestjs/swagger';
import { SignUpUserDto } from 'src/api/auth/dto/signup-user.dto';

export class UpdateUserDto extends PartialType(SignUpUserDto) {}
