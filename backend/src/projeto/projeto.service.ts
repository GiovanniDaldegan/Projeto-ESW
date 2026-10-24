import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';

@Injectable()
export class ProjetoService {
  constructor(private prisma: PrismaService) {}

  async create(createProjetoDto: CreateProjetoDto) {
    await this.validarUsuarioExiste(createProjetoDto.idUsuario);

    return this.prisma.projeto.create({
      data: {
        nome: createProjetoDto.nome,
        idUsuario: createProjetoDto.idUsuario,
      },
    });
  }

  async getAll() {
    return this.prisma.projeto.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async getById(id: number) {
    const projeto = await this.prisma.projeto.findUnique({
      where: { id },
    });

    if (!projeto) {
      throw new NotFoundException(`Projeto com ID ${id} não encontrado.`);
    }

    return projeto;
  }

  async update(id: number, updateProjetoDto: UpdateProjetoDto) {
    await this.getById(id);

    if (updateProjetoDto.idUsuario) {
      await this.validarUsuarioExiste(updateProjetoDto.idUsuario);
    }

    return this.prisma.projeto.update({
      where: { id },
      data: updateProjetoDto,
    });
  }

  async delete(id: number) {
    await this.getById(id);

    await this.prisma.projeto.delete({
      where: { id },
    });

    return { message: `Projeto com ID ${id} removido com sucesso.` };
  }

  private async validarUsuarioExiste(idUsuario: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: idUsuario },
    });

    if (!usuario) {
      throw new NotFoundException(
        `Usuário com ID ${idUsuario} não encontrado.`,
      );
    }
  }
}
