import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = new User({ ...createUserDto, password: hashedPassword });
    return user.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ where: { email } });
  }

  async update(id: string, updateUserDto: Partial<User>): Promise<[number, User[]]> {
    return this.userModel.update(updateUserDto, { where: { id }, returning: true });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
