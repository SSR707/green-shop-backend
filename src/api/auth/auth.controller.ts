import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDto, SignUpUserDto, VerifyUserDto } from './dto/index';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common';

@ApiTags('Auth Api')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  signin(@Body() signinAuthDto: SignInUserDto) {
    return this.authService.signin(signinAuthDto);
  }

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register user' })
  signup(@Body() signupAuthDto: SignUpUserDto) {
    return this.authService.signup(signupAuthDto);
  }

  @Public()
  @Post('verifyUser')
  @ApiOperation({ summary: 'verify user' })
  verifyUser(@Body() verifyUserDto: VerifyUserDto) {
    return this.authService.verifyUser(verifyUserDto);
  }
}
