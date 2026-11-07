import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBacklogDto } from './dto/create-backlog.dto';
import { UpdateBacklogDto } from './dto/update-backlog.dto';

@Injectable()
export class BacklogService {
  constructor(private prisma: PrismaService) {}

  async create(createBacklogDto: CreateBacklogDto) {
    await this.validarProjetoExiste(createBacklogDto.idProjeto);

    return this.prisma.backlog.create({
      data: {
        nome: createBacklogDto.nome,
        idProjeto: createBacklogDto.idProjeto,
        sprint: false,
      },
    });
  }

  async getAll(idProjeto?: number) {
    return this.prisma.backlog.findMany({
      where: { sprint: false, idProjeto },
      orderBy: { id: 'asc' },
    });
  }

  async getById(id: number) {
    const backlog = await this.prisma.backlog.findFirst({
      where: { id, sprint: false },
    });

    if (!backlog) {
      throw new NotFoundException(`Backlog com ID ${id} não encontrado.`);
    }

    return backlog;
  }

  async update(id: number, updateBacklogDto: UpdateBacklogDto) {
    await this.getById(id);

    if (updateBacklogDto.idProjeto) {
      await this.validarProjetoExiste(updateBacklogDto.idProjeto);
    }

    return this.prisma.backlog.update({
      where: { id },
      data: updateBacklogDto,
    });
  }

  async delete(id: number) {
    await this.getById(id);

    await this.prisma.backlog.delete({
      where: { id },
    });

    return { message: `Backlog com ID ${id} removido com sucesso.` };
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
