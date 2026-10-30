import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHistoriaUsuarioDto } from './dto/create-historia-usuario.dto';
import { UpdateHistoriaUsuarioDto } from './dto/update-historia-usuario.dto';

@Injectable()
export class HistoriaUsuarioService {
  constructor(private prisma: PrismaService) {}

  async create(createHistoriaUsuarioDto: CreateHistoriaUsuarioDto) {
    await this.validarRelacionamentos(
      createHistoriaUsuarioDto.idBacklog,
      createHistoriaUsuarioDto.idEpico,
    );

    return this.prisma.historiaUsuario.create({
      data: createHistoriaUsuarioDto,
    });
  }

  async getAll(idBacklog?: number, idEpico?: number) {
    return this.prisma.historiaUsuario.findMany({
      where: { idBacklog, idEpico },
      orderBy: { id: 'asc' },
    });
  }

  async getById(id: number) {
    const historiaUsuario = await this.prisma.historiaUsuario.findUnique({
      where: { id },
    });

    if (!historiaUsuario) {
      throw new NotFoundException(
        `História de usuário com ID ${id} não encontrada.`,
      );
    }

    return historiaUsuario;
  }

  async update(id: number, updateHistoriaUsuarioDto: UpdateHistoriaUsuarioDto) {
    const historiaUsuario = await this.getById(id);

    if (
      updateHistoriaUsuarioDto.idBacklog !== undefined ||
      updateHistoriaUsuarioDto.idEpico !== undefined
    ) {
      await this.validarRelacionamentos(
        updateHistoriaUsuarioDto.idBacklog ?? historiaUsuario.idBacklog,
        updateHistoriaUsuarioDto.idEpico === undefined
          ? historiaUsuario.idEpico
          : updateHistoriaUsuarioDto.idEpico,
      );
    }

    return this.prisma.historiaUsuario.update({
      where: { id },
      data: updateHistoriaUsuarioDto,
    });
  }

  async delete(id: number) {
    await this.getById(id);

    await this.prisma.historiaUsuario.delete({
      where: { id },
    });

    return {
      message: `História de usuário com ID ${id} removida com sucesso.`,
    };
  }

  private async validarRelacionamentos(
    idBacklog: number,
    idEpico?: number | null,
  ) {
    const backlog = await this.prisma.backlog.findUnique({
      where: { id: idBacklog },
    });

    if (!backlog) {
      throw new NotFoundException(
        `Backlog com ID ${idBacklog} não encontrado.`,
      );
    }

    if (idEpico === undefined || idEpico === null) {
      return;
    }

    const epico = await this.prisma.epico.findUnique({
      where: { id: idEpico },
    });

    if (!epico) {
      throw new NotFoundException(`Épico com ID ${idEpico} não encontrado.`);
    }

    if (epico.idProjeto !== backlog.idProjeto) {
      throw new BadRequestException(
        'O épico e o backlog devem pertencer ao mesmo projeto.',
      );
    }
  }
}
