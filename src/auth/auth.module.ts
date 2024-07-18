import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { RolesGuard } from './roles.guard';
import { AuthController } from './auth.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { OtpService } from './otp.service';

@Module({
  imports: [
    UserModule,
    MailerModule,
    JwtModule.register({
      secret: "sdhfuioew",
      signOptions: { expiresIn: "10m" },
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, RolesGuard, JwtService, OtpService],
})
export class AuthModule {}
