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
import { EpicoService } from './epico.service';
import { CreateEpicoDto } from './dto/create-epico.dto';
import { UpdateEpicoDto } from './dto/update-epico.dto';

@Controller('epico')
export class EpicoController {
  constructor(private readonly epicoService: EpicoService) {}

  @Post()
  async create(@Body() createEpicoDto: CreateEpicoDto) {
    return this.epicoService.create(createEpicoDto);
  }

  @Get()
  async getAll(
    @Query('idProjeto', new ParseIntPipe({ optional: true })) idProjeto?: number,
  ) {
    return this.epicoService.getAll(idProjeto);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.epicoService.getById(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEpicoDto: UpdateEpicoDto,
  ) {
    return this.epicoService.update(id, updateEpicoDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.epicoService.delete(id);
  }
}
