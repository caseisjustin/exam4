import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Response } from './response.model';
import { CreateResponseDto } from './dto/create-response.dto';

@Injectable()
export class ResponseService {
  constructor(
    @InjectModel(Response)
    private responseModel: typeof Response,
  ) {}

  async create(createResponseDto: CreateResponseDto): Promise<Response> {
    return this.responseModel.create({...createResponseDto});
  }

  async findAll(): Promise<Response[]> {
    return this.responseModel.findAll();
  }

  async findOne(id: string): Promise<Response> {
    return this.responseModel.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    const response = await this.findOne(id);
    await response.destroy();
  }
}
