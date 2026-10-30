import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ProjetoModule } from './projeto/projeto.module';
import { EpicoModule } from './epico/epico.module';
import { HistoriaUsuarioModule } from './historia-usuario/historia-usuario.module';
import { BacklogModule } from './backlog/backlog.module';
import { SprintModule } from './sprint/sprint.module';
import { CriterioAceitacaoModule } from './criterio-aceitacao/criterio-aceitacao.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UsuarioModule,
    ProjetoModule,
    EpicoModule,
    HistoriaUsuarioModule,
    BacklogModule,
    SprintModule,
    CriterioAceitacaoModule,
    AuthModule,
  ],
})
export class AppModule {}
