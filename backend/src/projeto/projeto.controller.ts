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
import { ProjetoService } from './projeto.service';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';

@Controller('projeto')
export class ProjetoController {
  constructor(private readonly projetoService: ProjetoService) {}

  @Post()
  async create(@Body() createProjetoDto: CreateProjetoDto) {
    return this.projetoService.create(createProjetoDto);
  }

  @Get()
  async getAll(
    @Query('idUsuario', new ParseIntPipe({ optional: true })) idUsuario?: number,
  ) {
    return this.projetoService.getAll(idUsuario);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.projetoService.getById(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjetoDto: UpdateProjetoDto,
  ) {
    return this.projetoService.update(id, updateProjetoDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.projetoService.delete(id);
  }
}
