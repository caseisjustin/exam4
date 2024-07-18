import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Roles } from 'src/auth2/roles.decorator';
import { RolesGuard } from 'src/auth2/roles.guard';

@Controller('questions')
// @UseGuards(RolesGuard)
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  // @Roles(['admin', 'moderator'])
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Get()
  async findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.questionService.findOne(id);
  }

  @Put(':id')
  @Roles(['admin', 'moderator'])
  async update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  @Roles(['admin'])
  async remove(@Param('id') id: string) {
    return this.questionService.remove(id);
  }
}
