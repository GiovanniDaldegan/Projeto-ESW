import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCriterioAceitacaoDto } from './dto/create-criterio-aceitacao.dto';
import { UpdateCriterioAceitacaoDto } from './dto/update-criterio-aceitacao.dto';

@Injectable()
export class CriterioAceitacaoService {
  constructor(private prisma: PrismaService) {}

  async create(createCriterioAceitacaoDto: CreateCriterioAceitacaoDto) {
    await this.validarHistoriaUsuarioExiste(createCriterioAceitacaoDto.idHu);

    return this.prisma.criterioAceitacao.create({
      data: createCriterioAceitacaoDto,
    });
  }

  async getAll(idHu?: number) {
    return this.prisma.criterioAceitacao.findMany({
      where: { idHu },
      orderBy: { id: 'asc' },
    });
  }

  async getById(id: number) {
    const criterioAceitacao = await this.prisma.criterioAceitacao.findUnique({
      where: { id },
    });

    if (!criterioAceitacao) {
      throw new NotFoundException(
        `Critério de aceitação com ID ${id} não encontrado.`,
      );
    }

    return criterioAceitacao;
  }

  async update(
    id: number,
    updateCriterioAceitacaoDto: UpdateCriterioAceitacaoDto,
  ) {
    await this.getById(id);

    if (updateCriterioAceitacaoDto.idHu) {
      await this.validarHistoriaUsuarioExiste(updateCriterioAceitacaoDto.idHu);
    }

    return this.prisma.criterioAceitacao.update({
      where: { id },
      data: updateCriterioAceitacaoDto,
    });
  }

  async delete(id: number) {
    await this.getById(id);

    await this.prisma.criterioAceitacao.delete({
      where: { id },
    });

    return {
      message: `Critério de aceitação com ID ${id} removido com sucesso.`,
    };
  }

  private async validarHistoriaUsuarioExiste(idHu: number) {
    const historiaUsuario = await this.prisma.historiaUsuario.findUnique({
      where: { id: idHu },
    });

    if (!historiaUsuario) {
      throw new NotFoundException(
        `História de usuário com ID ${idHu} não encontrada.`,
      );
    }
  }
}
