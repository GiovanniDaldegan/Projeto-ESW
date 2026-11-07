import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';

@Injectable()
export class SprintService {
  constructor(private prisma: PrismaService) {}

  async create(createSprintDto: CreateSprintDto) {
    await this.validarProjetoExiste(createSprintDto.idProjeto);
    this.validarDatas(createSprintDto.init, createSprintDto.finish);

    return this.prisma.backlog.create({
      data: {
        nome: createSprintDto.nome,
        idProjeto: createSprintDto.idProjeto,
        sprint: true,
        init: createSprintDto.init,
        finish: createSprintDto.finish,
      },
    });
  }

  async getAll(idProjeto?: number) {
    return this.prisma.backlog.findMany({
      where: { sprint: true, idProjeto },
      orderBy: { id: 'asc' },
    });
  }

  async getById(id: number) {
    const sprint = await this.prisma.backlog.findFirst({
      where: { id, sprint: true },
    });

    if (!sprint) {
      throw new NotFoundException(`Sprint com ID ${id} não encontrada.`);
    }

    return sprint;
  }

  async update(id: number, updateSprintDto: UpdateSprintDto) {
    const sprint = await this.getById(id);

    if (updateSprintDto.idProjeto) {
      await this.validarProjetoExiste(updateSprintDto.idProjeto);
    }

    if (updateSprintDto.init || updateSprintDto.finish) {
      this.validarDatas(
        updateSprintDto.init ?? sprint.init!,
        updateSprintDto.finish ?? sprint.finish!,
      );
    }

    return this.prisma.backlog.update({
      where: { id },
      data: updateSprintDto,
    });
  }

  async delete(id: number) {
    await this.getById(id);

    await this.prisma.backlog.delete({
      where: { id },
    });

    return { message: `Sprint com ID ${id} removida com sucesso.` };
  }

  private validarDatas(init: Date, finish: Date) {
    if (finish < init) {
      throw new BadRequestException(
        'A data de término deve ser posterior à data de início.',
      );
    }
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
