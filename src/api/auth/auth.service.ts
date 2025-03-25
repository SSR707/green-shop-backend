import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { SignInUserDto, SignUpUserDto, VerifyUserDto } from './dto/index';
import { OtpEntity, OtpRepository, UserEntity, UserRepository } from 'src/core';
import {
  BcryptEncryption,
  CustomJwtService,
  EmailService,
} from 'src/infrastructure';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: UserRepository,
    @InjectRepository(OtpEntity)
    private otpRepository: OtpRepository,
    private readonly emailServices: EmailService,
    private readonly jwtServices: CustomJwtService,
    private readonly configService: ConfigService,
  ) {}
  async signin(signinAuthDto: SignInUserDto) {
    const { email, password } = signinAuthDto;
    const currentUser = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (!currentUser) {
      return {
        status_code: HttpStatus.NOT_FOUND,
        message: 'User not found',
        type: 'email',
      };
    }
    if (currentUser.is_active === false) {
      return {
        status_code: HttpStatus.BAD_REQUEST,
        message: 'User is inactive',
        type: 'user_in_active',
      };
    }
    const is_match_pass = await BcryptEncryption.compare(
      password,
      currentUser.password,
    );
    if (!is_match_pass) {
      return {
        status_code: HttpStatus.NOT_FOUND,
        message: 'Incorrect password. Please try again.',
        type: 'password',
      };
    }
    const payload = {
      sub: currentUser.email,
      id: currentUser.id,
      role: currentUser.role,
    };
    const accessToken = await this.jwtServices.generateAccessToken(payload);
    const refreshToken = await this.jwtServices.generateRefreshToken(payload);
    return {
      status_code: HttpStatus.OK,
      message: 'success',
      data: {
        accessToken,
        access_token_expire:
          this.configService.get<string>('ACCESS_TOKEN_TIME'),
        refreshToken,
        refresh_token_expire:
          this.configService.get<string>('REFRESH_TOKEN_TIME'),
      },
    };
  }

  async signup(signupAuthDto: SignUpUserDto) {
    const currentUser = await this.userRepository.findOne({
      where: { email: signupAuthDto.email },
    });
    if (currentUser) {
      return {
        status_code: HttpStatus.CONFLICT,
        message: 'User with this email already exists',
        type: 'email',
      };
    }
    signupAuthDto.password = await BcryptEncryption.encrypt(
      signupAuthDto.password,
    );
    const otp = Math.floor(Math.random() * 100000) + 1;
    await this.emailServices.sendActivedOtp(
      signupAuthDto.email,
      'otp',
      signupAuthDto.fullname,
      otp,
    );
    const user = this.userRepository.create({ ...signupAuthDto });
    await this.userRepository.save(user);
    const OtpEntity = this.otpRepository.create({
      email: signupAuthDto.email,
      otp_code: otp,
      expired_at: new Date(Date.now() + 10 * 60 * 1000),
    });
    await this.otpRepository.save(OtpEntity);

    return {
      status_code: HttpStatus.OK,
      message: 'success',
      data: user,
    };
  }

  async verifyUser(verifyUser: VerifyUserDto) {
    const currentUser = await this.userRepository.findOne({
      where: {
        email: verifyUser.email,
      },
    });
    if (!currentUser) {
      return {
        status_code: HttpStatus.NOT_FOUND,
        message: 'User not found',
        type: 'email',
      };
    }
    const currentOtp = await this.otpRepository.findOne({
      where: { email: verifyUser.email },
    });
    if (!currentOtp) {
      return {
        status_code: HttpStatus.NOT_FOUND,
        message: 'Otp not found',
        type: 'otp',
      };
    }
    if (new Date() > currentOtp.expired_at) {
      await this.otpRepository.remove(currentOtp);
      return {
        status_code: HttpStatus.UNAUTHORIZED,
        message: 'This OTP has expired. Please request a new code.',
        type: 'invalid_otp',
      };
    }
    if (currentOtp.otp_code !== verifyUser.otp_code) {
      return {
        status_code: HttpStatus.UNAUTHORIZED,
        message: 'The OTP you entered is incorrect. Please try again.',
        type: 'invalid_otp',
      };
    }
    await this.otpRepository.remove(currentOtp);
    currentUser.is_active = true;
    await this.userRepository.save(currentUser);
    return { status: HttpStatus.OK, message: 'User is Actived' };
  }
}
