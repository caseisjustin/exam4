import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Question } from './question.model';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question)
    private questionModel: typeof Question,
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    return this.questionModel.create({...createQuestionDto});
  }

  async findAll(): Promise<Question[]> {
    return this.questionModel.findAll();
  }

  async findOne(id: string): Promise<Question> {
    return this.questionModel.findOne({ where: { id } });
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<[number, Question[]]> {
    return this.questionModel.update(updateQuestionDto, { where: { id }, returning: true });
  }

  async remove(id: string): Promise<void> {
    const question = await this.findOne(id);
    await question.destroy();
  }
}
