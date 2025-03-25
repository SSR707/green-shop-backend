import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EmailService {
  constructor(private readonly emailServices: MailerService) {}

  private getOtpTemplate(name: string, otp: number): string {
    const filePath = path.join(process.cwd(), 'sendMail', 'otp.html');
    let html = fs.readFileSync(filePath, 'utf-8');

    const otpArray = otp.toString().split('');
    const otpBlocks = otpArray
      .map(
        (digit) =>
          `
        <div style="padding: 20px; background: rgba(137, 44, 220, 0.05); border-radius: 5px; font-weight: 600; font-size: 24px; color: #10241b; text-align: center; ">
          ${digit}
        </div>`,
      )
      .join('');

    html = html.replace('{{name}}', name);
    html = html.replace('{{otp_blocks}}', otpBlocks);

    return html;
  }

  async sendActivedOtp(to: string, subject: string, name: string, otp: number) {
    try {
      await this.emailServices.sendMail({
        to,
        subject,
        html: this.getOtpTemplate(name, otp),
      });
    } catch (error) {
      throw new BadRequestException(`Error send email Error ${error}`);
    }
  }
}
