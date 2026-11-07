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
import { BacklogService } from './backlog.service';
import { CreateBacklogDto } from './dto/create-backlog.dto';
import { UpdateBacklogDto } from './dto/update-backlog.dto';

@Controller('backlog')
export class BacklogController {
  constructor(private readonly backlogService: BacklogService) {}

  @Post()
  async create(@Body() createBacklogDto: CreateBacklogDto) {
    return this.backlogService.create(createBacklogDto);
  }

  @Get()
  async getAll(
    @Query('idProjeto', new ParseIntPipe({ optional: true })) idProjeto?: number,
  ) {
    return this.backlogService.getAll(idProjeto);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.backlogService.getById(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBacklogDto: UpdateBacklogDto,
  ) {
    return this.backlogService.update(id, updateBacklogDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.backlogService.delete(id);
  }
}
