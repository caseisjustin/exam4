import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Survey } from './survey.model';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';

@Injectable()
export class SurveyService {
  constructor(
    @InjectModel(Survey)
    private surveyModel: typeof Survey,
  ) {}

  async create(createSurveyDto: CreateSurveyDto): Promise<Survey> {
    return this.surveyModel.create({...createSurveyDto});
  }

  async findAll(): Promise<Survey[]> {
    return this.surveyModel.findAll();
  }

  async findOne(id: string): Promise<Survey> {
    return this.surveyModel.findOne({ where: { id } });
  }

  async update(id: string, updateSurveyDto: UpdateSurveyDto): Promise<[number, Survey[]]> {
    return await this.surveyModel.update(updateSurveyDto, { where: { id }, returning: true });
  }

  async remove(id: string): Promise<void> {
    const survey = await this.findOne(id);
    await survey.destroy();
  }
}
