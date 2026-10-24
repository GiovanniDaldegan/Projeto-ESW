import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './login.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(dto: LoginDto) {
    // ve se tem user por email
    const user = await this.prisma.usuario.findUnique({
      where: { email: dto.email },
    });

    // se nn tiver bruh
    if (!user) {
      throw new UnauthorizedException('E-mail ou senha inválidos');
    }

    // compara senha cm texto puro xD
    if (user.senha !== dto.senha) {
      throw new UnauthorizedException('E-mail ou senha inválidos');
    }

    // retorna tudo do user so pra zoar
    return {
      message: 'Login realizado com sucesso',
      usuario: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        senha: user.senha,
      },
    };
  }
}