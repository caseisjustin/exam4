import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { Survey } from './survey.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Survey])],
  providers: [SurveyService, JwtService],
  controllers: [SurveyController],
})
export class SurveyModule {}
