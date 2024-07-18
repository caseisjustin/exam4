import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ResultService } from './result.service';
import { CreateResultDto } from './dto/create-result.dto';
import { RolesGuard } from 'src/auth2/roles.guard';
import { Roles } from 'src/auth2/roles.decorator';

@Controller('results')
@UseGuards(RolesGuard)
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post()
  @Roles(['admin', 'moderator'])
  async create(@Body() createResultDto: CreateResultDto) {
    return this.resultService.create(createResultDto);
  }

  @Get()
  @Roles(['admin', 'moderator'])
  async findAll() {
    return this.resultService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.resultService.findOne(id);
  }

  @Delete(':id')
  @Roles(['admin', 'moderator'])
  async remove(@Param('id') id: string) {
    return this.resultService.remove(id);
  }
}
