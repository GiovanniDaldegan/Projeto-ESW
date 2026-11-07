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
import { HistoriaUsuarioService } from './historia-usuario.service';
import { CreateHistoriaUsuarioDto } from './dto/create-historia-usuario.dto';
import { UpdateHistoriaUsuarioDto } from './dto/update-historia-usuario.dto';

@Controller('historia-usuario')
export class HistoriaUsuarioController {
  constructor(
    private readonly historiaUsuarioService: HistoriaUsuarioService,
  ) {}

  @Post()
  async create(@Body() createHistoriaUsuarioDto: CreateHistoriaUsuarioDto) {
    return this.historiaUsuarioService.create(createHistoriaUsuarioDto);
  }

  @Get()
  async getAll(
    @Query('idBacklog', new ParseIntPipe({ optional: true })) idBacklog?: number,
    @Query('idEpico', new ParseIntPipe({ optional: true })) idEpico?: number,
  ) {
    return this.historiaUsuarioService.getAll(idBacklog, idEpico);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.historiaUsuarioService.getById(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHistoriaUsuarioDto: UpdateHistoriaUsuarioDto,
  ) {
    return this.historiaUsuarioService.update(id, updateHistoriaUsuarioDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.historiaUsuarioService.delete(id);
  }
}
