import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { Question } from './question.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Question])],
  providers: [QuestionService, JwtService],
  controllers: [QuestionController],
})
export class QuestionModule {}
