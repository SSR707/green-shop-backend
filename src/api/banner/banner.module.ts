import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerEntity } from 'src/core';
import { FileModule } from 'src/infrastructure';

@Module({
  imports: [TypeOrmModule.forFeature([BannerEntity]), FileModule],
  controllers: [BannerController],
  providers: [BannerService],
})
export class BannerModule {}
