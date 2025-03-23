import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminGuard, UserID } from 'src/common';

@ApiBearerAuth()
@ApiTags('User Api')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Get All Users',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All Users fetched successfully',
    schema: {
      example: {
        status_code: HttpStatus.OK,
        message: 'success',
        data: [
          {
            id: '4414e170-64c7-4d87-9daa-2cc6752818f4',
            created_at: '1742548077907',
            updated_at: '1742552633357',
            fullname: 'Store001',
            email: 'sk1lusa21@gmail.com',
            password:
              '$2b$10$brVxWj38OQk1TX/wfiT96uOVSYITRvFzJUXaTuUfnu1Qma3Ktmuta',
            avatar:
              'http://localhost:3133/uploads/users/29b6c7fc-377c-48fa-a588-e30d753d67a1.jpg',
            phone_number: '+998997777777',
            role: 'SUPPERADMIN',
            is_active: true,
            address: [],
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Failed fetchin stores',
    schema: {
      example: {
        status_code: HttpStatus.BAD_REQUEST,
        message: 'Error on fetching stores',
      },
    },
  })
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({
    summary: 'Get Profile',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ' Users Profile  fetched successfully',
    schema: {
      example: {
        status_code: HttpStatus.OK,
        message: 'success',
        data: [
          {
            id: '4414e170-64c7-4d87-9daa-2cc6752818f4',
            created_at: '1742548077907',
            updated_at: '1742552633357',
            fullname: 'Store001',
            email: 'sk1lusa21@gmail.com',
            avatar:
              'http://localhost:3133/uploads/users/29b6c7fc-377c-48fa-a588-e30d753d67a1.jpg',
            phone_number: '+998997777777',
          },
        ],
      },
    },
  })
  @Get('profile')
  getProfile(@UserID() id: string) {
    return this.userService.getProfile(id);
  }
  @ApiOperation({ summary: 'Get Users ById' })
  @ApiParam({
    name: 'id',
    description: 'ID of the users',
    type: String,
    example: '1412ahrqw-e351ad34-12g41934s-asr',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Users ById fetched successfully',
    schema: {
      example: {
        status_code: HttpStatus.OK,
        message: 'success',
        data: {
          id: '4414e170-64c7-4d87-9daa-2cc6752818f4',
          created_at: '1742548077907',
          updated_at: '1742552633357',
          fullname: 'Store001',
          email: 'sk1lusa21@gmail.com',
          password:
            '$2b$10$brVxWj38OQk1TX/wfiT96uOVSYITRvFzJUXaTuUfnu1Qma3Ktmuta',
          avatar:
            'http://localhost:3133/uploads/users/29b6c7fc-377c-48fa-a588-e30d753d67a1.jpg',
          phone_number: '+998997777777',
          role: 'SUPPERADMIN',
          is_active: true,
          address: [],
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
    schema: {
      example: {
        status_code: HttpStatus.NOT_FOUND,
        message: 'User not found',
      },
    },
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Update User Profile ' })
  @ApiParam({
    name: 'id',
    description: 'ID of the users',
    type: String,
    example: '1412ahrqw-e351ad34-12g41934s-asr',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Updated Profile  ',
    schema: {
      example: {
        status_code: HttpStatus.OK,
        message: 'success',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User with id sdfh-2383924l-sdfj23 not found.',
    schema: {
      example: {
        status_code: HttpStatus.NOT_FOUND,
        message: 'User with id sdfh-2383924l-sdfj23 not found.',
      },
    },
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete User Profile ' })
  @ApiParam({
    name: 'id',
    description: 'ID of the users',
    type: String,
    example: '1412ahrqw-e351ad34-12g41934s-asr',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete Profile  ',
    schema: {
      example: {
        status_code: HttpStatus.OK,
        message: 'success',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User with id sdfh-2383924l-sdfj23 not found.',
    schema: {
      example: {
        status_code: HttpStatus.NOT_FOUND,
        message: 'User with id sdfh-2383924l-sdfj23 not found.',
      },
    },
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post('upload-img')
  @ApiOperation({ summary: 'Upload user profile image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Upload store profile image',
    schema: {
      example: {
        status_code: HttpStatus.OK,
        message: 'success',
        data: {
          image_url:
            'http://localhost:3133/uploads/products/eadd515b-3f77-4d93-981b-8b2e94171528.jpg',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
    schema: {
      example: {
        status_code: HttpStatus.NOT_FOUND,
        message: 'User not found',
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadImg(@UserID() id: string, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    return this.userService.uploadImg(id, file);
  }
}
