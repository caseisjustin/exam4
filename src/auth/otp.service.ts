import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OtpService {
  private otpMap = new Map<string, string>(); // Map to store userId and OTP

  constructor(private readonly mailerService: MailerService) {}

  generateOTP(): string {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
  }

  storeOTP(userId: string, otp: string): void {
    this.otpMap.set(userId, otp);
  }

  getOTP(userId: string): string | undefined {
    return this.otpMap.get(userId);
  }

  clearOTP(userId: string): void {
    this.otpMap.delete(userId);
  }

  async sendOTPByEmail(email: string, userId: uuidv4): Promise<void> {
    const otp = this.generateOTP();

    this.storeOTP(userId, otp);

    await this.mailerService.sendMail({
      to: email,
      subject: 'OTP Verification',
      template: 'otp',
      text: `${otp}`
    });
  }
}
