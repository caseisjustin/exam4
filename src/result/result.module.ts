import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { Result } from './result.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Result])],
  providers: [ResultService, JwtService],
  controllers: [ResultController],
})
export class ResultModule {}
