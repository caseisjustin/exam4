import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Result } from './result.model';
import { CreateResultDto } from './dto/create-result.dto';

@Injectable()
export class ResultService {
  constructor(
    @InjectModel(Result)
    private resultModel: typeof Result,
  ) {}

  async create(createResultDto: CreateResultDto): Promise<Result> {
    return this.resultModel.create({...createResultDto});
  }

  async findAll(): Promise<Result[]> {
    return this.resultModel.findAll();
  }

  async findOne(id: string): Promise<Result> {
    return this.resultModel.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    const result = await this.findOne(id);
    await result.destroy();
  }
}
