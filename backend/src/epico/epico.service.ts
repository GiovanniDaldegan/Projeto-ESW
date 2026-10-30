import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEpicoDto } from './dto/create-epico.dto';
import { UpdateEpicoDto } from './dto/update-epico.dto';

@Injectable()
export class EpicoService {
  constructor(private prisma: PrismaService) {}

  async create(createEpicoDto: CreateEpicoDto) {
    await this.validarProjetoExiste(createEpicoDto.idProjeto);

    return this.prisma.epico.create({
      data: {
        nome: createEpicoDto.nome,
        idProjeto: createEpicoDto.idProjeto,
      },
    });
  }

  async getAll(idProjeto?: number) {
    return this.prisma.epico.findMany({
      where: { idProjeto },
      orderBy: { id: 'asc' },
    });
  }

  async getById(id: number) {
    const epico = await this.prisma.epico.findUnique({
      where: { id },
    });

    if (!epico) {
      throw new NotFoundException(`Épico com ID ${id} não encontrado.`);
    }

    return epico;
  }

  async update(id: number, updateEpicoDto: UpdateEpicoDto) {
    await this.getById(id);

    if (updateEpicoDto.idProjeto) {
      await this.validarProjetoExiste(updateEpicoDto.idProjeto);
    }

    return this.prisma.epico.update({
      where: { id },
      data: updateEpicoDto,
    });
  }

  async delete(id: number) {
    await this.getById(id);

    await this.prisma.epico.delete({
      where: { id },
    });

    return { message: `Épico com ID ${id} removido com sucesso.` };
  }

  private async validarProjetoExiste(idProjeto: number) {
    const projeto = await this.prisma.projeto.findUnique({
      where: { id: idProjeto },
    });

    if (!projeto) {
      throw new NotFoundException(
        `Projeto com ID ${idProjeto} não encontrado.`,
      );
    }
  }
}
