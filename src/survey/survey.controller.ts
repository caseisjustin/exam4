import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { RolesGuard } from 'src/auth2/roles.guard';
import { Roles } from 'src/auth2/roles.decorator';

@Controller('surveys')
// @UseGuards(RolesGuard)
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post()
  // @Roles(['admin', 'moderator'])
  async create(@Body() createSurveyDto: CreateSurveyDto) {
    return this.surveyService.create(createSurveyDto);
  }

  @Get()
  async findAll() {
    return this.surveyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.surveyService.findOne(id);
  }

  @Put(':id')
  // @Roles(['admin', 'moderator'])
  async update(@Param('id') id: string, @Body() updateSurveyDto: UpdateSurveyDto) {
    return this.surveyService.update(id, updateSurveyDto);
  }

  @Delete(':id')
  // @Roles(['admin'])
  async remove(@Param('id') id: string) {
    return this.surveyService.remove(id);
  }
}
