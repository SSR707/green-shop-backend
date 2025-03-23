import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Public, UserID } from 'src/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Reviews Api')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiBearerAuth()
  @Post()
  create(@UserID() id: string, @Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(id, createReviewDto);
  }

  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(id);
  }

  @Public()
  @Get('getByProductId/:id')
  findByProductId(@Param('id') id: string) {
    return this.reviewsService.findByProductId(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(id);
  }
}
