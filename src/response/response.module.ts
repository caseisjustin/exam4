import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ResponseService } from './response.service';
import { ResponseController } from './response.controller';
import { Response } from './response.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Response])],
  providers: [ResponseService, JwtService],
  controllers: [ResponseController],
})
export class ResponseModule {}
