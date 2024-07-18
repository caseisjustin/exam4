import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ResponseService } from './response.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { Roles } from 'src/auth2/roles.decorator';
import { RolesGuard } from 'src/auth2/roles.guard';

@Controller('responses')
@UseGuards(RolesGuard)
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

  @Post()
  @Roles(['user'])
  async create(@Body() createResponseDto: CreateResponseDto) {
    return this.responseService.create(createResponseDto);
  }

  @Get()
  @Roles(['admin', 'moderator'])
  async findAll() {
    return this.responseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.responseService.findOne(id);
  }

  @Delete(':id')
  @Roles(['admin', 'moderator'])
  async remove(@Param('id') id: string) {
    return this.responseService.remove(id);
  }
}
