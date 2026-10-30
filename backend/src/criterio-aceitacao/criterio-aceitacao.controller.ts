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
import { CriterioAceitacaoService } from './criterio-aceitacao.service';
import { CreateCriterioAceitacaoDto } from './dto/create-criterio-aceitacao.dto';
import { UpdateCriterioAceitacaoDto } from './dto/update-criterio-aceitacao.dto';

@Controller('criterio-aceitacao')
export class CriterioAceitacaoController {
  constructor(
    private readonly criterioAceitacaoService: CriterioAceitacaoService,
  ) {}

  @Post()
  async create(@Body() createCriterioAceitacaoDto: CreateCriterioAceitacaoDto) {
    return this.criterioAceitacaoService.create(createCriterioAceitacaoDto);
  }

  @Get()
  async getAll(
    @Query('idHu', new ParseIntPipe({ optional: true })) idHu?: number,
  ) {
    return this.criterioAceitacaoService.getAll(idHu);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.criterioAceitacaoService.getById(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCriterioAceitacaoDto: UpdateCriterioAceitacaoDto,
  ) {
    return this.criterioAceitacaoService.update(id, updateCriterioAceitacaoDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.criterioAceitacaoService.delete(id);
  }
}
