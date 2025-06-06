import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CustomJwtService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateRefreshToken(payload: any): Promise<string> {
    try {
      const refreshToken = this.jwtService.sign(payload, {
        secret: this.configService.get<string>('REFRESH_TOKEN_KEY'),
        expiresIn: this.configService.get<string>('REFRESH_TOKEN_TIME'),
      });
      return refreshToken;
    } catch (error) {
      throw new BadRequestException('Failed to generate refresh token.');
    }
  }
  async generateAccessToken(payload: any): Promise<string> {
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('ACCESS_TOKEN_KEY'),
      expiresIn: this.configService.get<string>('ACCESS_TOKEN_TIME'),
    });
    return accessToken;
  }
  async verifyRefreshToken(refresh_token: string) {
    try {
      const payload = this.jwtService.verify(refresh_token, {
        secret: this.configService.get<string>('REFRESH_TOKEN_KEY'),
      });
      return payload;
    } catch (error) {
      throw new BadRequestException(`Error on refresh token: ${error}`);
    }
  }
  async verifyAccessToken(access_token: string) {
    try {
      const payload = this.jwtService.verify(access_token, {
        secret: this.configService.get<string>('ACCESS_TOKEN_KEY'),
      });
      return payload;
    } catch (error) {
      throw new BadRequestException(`Error on refresh token: ${error}`);
    }
  }
}
