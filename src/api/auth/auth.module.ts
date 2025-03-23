import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpEntity, UserEntity } from 'src/core';
import { CustomJwtModule, EmailModule } from 'src/infrastructure';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, OtpEntity]),
    CustomJwtModule,
    EmailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
