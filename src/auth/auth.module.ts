// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { OtpService } from './otp.service';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    ConfigModule,
    JwtModule.register({
      secret: "fiwhe#&$",
      signOptions: { expiresIn: '60m' },
    }),
    MailerModule,
  ],
  providers: [AuthService, OtpService],
  controllers: [AuthController],
})
export class AuthModule {}
