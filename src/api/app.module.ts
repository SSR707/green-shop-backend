import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/config';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { AddressModule } from './address/address.module';
import { ReviewsModule } from './reviews/reviews.module';
import {
  CustomJwtModule,
  EmailModule,
  FileModule,
} from '../infrastructure/index';
import { JwtGuard } from 'src/common';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.DB_URL,
      entities: ['dist/core/entity/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('SMTP_HOST'),
          port: configService.get<number>('SMTP_PORT'),
          secure: false,
          auth: {
            user: configService.get<string>('USER_MAIL'),
            pass: configService.get<string>('USER_MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: configService.get<string>('SMTP_USER'),
        },
      }),
    }),
    AuthModule,
    CustomJwtModule,
    EmailModule,
    UserModule,
    FileModule,
    CategoryModule,
    ProductModule,
    AddressModule,
    ReviewsModule,
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: JwtGuard }],
})
export class AppModule {}
