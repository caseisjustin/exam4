// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
// import { User } from './user.model';
import { OtpService } from './otp.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.model';
import { UUID } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private jwtService: JwtService,
    private otpService: OtpService,
  ) {}

  async register(email: string, username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, username, password: hashedPassword, role: 'user', status: 'inactive' });
    await user.save();
    await this.otpService.generateOtp(user);
    return user;
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    throw new UnauthorizedException();
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async verifyPayload(payload: any): Promise<User> {
    return this.userModel.findByPk(payload.sub);
  }

  async activateAccount(id: UUID): Promise<string> {
    const user = await this.userModel.findOne({where: {id}})
    user.status = "active"
    user.otp = ''
    user.save()
    return "Account activated"
  }
}
