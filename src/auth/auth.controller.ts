// src/auth/auth.controller.ts
import { Controller, Post, Body, UseGuards, Request, Get, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { OtpService } from './otp.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private otpService: OtpService,
  ) {}

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.authService.register(email, username, password);
  }

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    const user = await this.authService.validateUser(email, password);
    return this.authService.login(user);
  }

  @Post('verify-otp')
  async verifyOtp(@Body('email') email: string, @Body('otp') otp: string, @Body('password') password: string) {
    const user = await this.authService.validateUser(email, password);
    const isValid = await this.otpService.verifyOtp(user, otp);
    if (isValid) {
      const token = await this.authService.login(user)
      return {token, ...this.authService.activateAccount(user.id)};
    }
    throw new UnauthorizedException('Invalid OTP');
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
