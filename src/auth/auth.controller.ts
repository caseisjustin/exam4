import { Controller, Post, Body, Get, Request, UseGuards, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { OtpService } from './otp.service';
import { RolesGuard } from 'src/auth2/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly otpService: OtpService
  ) {}

  @Post('signup')
  async signUp(@Body() body: CreateUserDto) {
    const { password, ...userData } = body;
    const user = await this.authService.register({
      ...userData,
      password,
    });
    await this.otpService.sendOTPByEmail(user.email, user.id)
    return { message: 'User created', userId: user.id, otpSent: true };
  }

  @Post('signin')
  async signIn(@Body() body: any) {
    const user = await this.authService.validateUser(body.email, body.password);
    console.log(user)
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @UseGuards(RolesGuard)
  @Get('me')
  async getMe(@Request() req: any) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = this.jwtService.verify(token);
    return this.userService.findOne(decoded.sub);
  }

  @Post('verify-otp')
  async verifyOTP(@Body('email') email: string, @Body('otp') otp: string): Promise<{ message: string }> {
    const user = await this.userService.findByEmail(email)
    if(!user){
      throw new UnauthorizedException('Invalid credentials');
    }
    const storedOTP = this.otpService.getOTP(user.id);
    if (!storedOTP || storedOTP !== otp) {
      throw new BadRequestException('Invalid OTP');
    }
    user.status = "active"
    await this.userService.update(user.id, {...user})
    this.otpService.clearOTP(email);
    return { message: 'OTP verified successfully' };
  }

  @Get('logout')
  async logout() {
    return { message: 'Logout successful' };
  }

  @Post('refresh-token')
  async refreshToken(@Body() body: any) {
    const decoded = this.jwtService.verify(body.refreshToken);
    const user = await this.userService.findOne(decoded.sub);
    return this.authService.login(user);
  }
}
