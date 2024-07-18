// src/auth/otp.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
// import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import * as crypto from 'crypto';
import { User } from 'src/user/user.model';

@Injectable()
export class OtpService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private readonly mailerService: MailerService,
  ) {}

  async generateOtp(user: User): Promise<string> {
    const otp = crypto.randomBytes(3).toString('hex');
    user.otp = otp;
    await user.save();
    await this.sendOtpEmail(user.email, otp);
    return otp;
  }

  async sendOtpEmail(email: string, otp: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Your OTP Code',
      template: './otp',
      text: `${otp}`
    });
  }

  async verifyOtp(user: User, otp: string): Promise<boolean> {
    return user.otp === otp;
  }
}
