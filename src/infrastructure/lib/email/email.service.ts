import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly emailServices: MailerService) {}

  async sendActivedOtp(to: string, subject: string, otp: number) {
    try {
      await this.emailServices.sendMail({
        to,
        subject,
        html: `
        <h1>
          This is your otp: ${otp}
        </h1>
    `,
      });
    } catch (error) {
      throw new BadRequestException(`Error send email Error ${error}`);
    }
  }
}
