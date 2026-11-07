import {
  Controller,
  Post,
  Get,
  Body,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { SprintService } from './sprint.service';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';

@Controller('sprint')
export class SprintController {
  constructor(private readonly sprintService: SprintService) {}

  @Post()
  async create(@Body() createSprintDto: CreateSprintDto) {
    return this.sprintService.create(createSprintDto);
  }

  @Get()
  async getAll(
    @Query('idProjeto', new ParseIntPipe({ optional: true })) idProjeto?: number,
  ) {
    return this.sprintService.getAll(idProjeto);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.sprintService.getById(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSprintDto: UpdateSprintDto,
  ) {
    return this.sprintService.update(id, updateSprintDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.sprintService.delete(id);
  }
}
