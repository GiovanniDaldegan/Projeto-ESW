import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

const usuarioSelect = {
  id: true,
  nome: true,
  email: true,
};

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    await this.validarEmailDisponivel(createUsuarioDto.email);

    return this.prisma.usuario.create({
      data: {
        nome: createUsuarioDto.nome,
        email: createUsuarioDto.email,
        senha: createUsuarioDto.senha,
      },
      select: usuarioSelect,
    });
  }

  async getAll() {
    return this.prisma.usuario.findMany({
      select: usuarioSelect,
      orderBy: { id: 'asc' },
    });
  }

  async getById(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
      select: usuarioSelect,
    });

    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }

    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    await this.getById(id);

    if (updateUsuarioDto.email) {
      await this.validarEmailDisponivel(updateUsuarioDto.email, id);
    }

    return this.prisma.usuario.update({
      where: { id },
      data: updateUsuarioDto,
      select: usuarioSelect,
    });
  }

  async delete(id: number) {
    await this.getById(id);

    await this.prisma.usuario.delete({
      where: { id },
    });

    return { message: `Usuário com ID ${id} removido com sucesso.` };
  }

  private async validarEmailDisponivel(
    email: string,
    idUsuarioExcluido?: number,
  ) {
    const existingUser = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (existingUser && existingUser.id !== idUsuarioExcluido) {
      throw new ConflictException('O email fornecido já está em uso.');
    }
  }
}
