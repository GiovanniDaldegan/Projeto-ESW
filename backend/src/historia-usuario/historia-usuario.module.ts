import { Module } from '@nestjs/common';
import { HistoriaUsuarioService } from './historia-usuario.service';
import { HistoriaUsuarioController } from './historia-usuario.controller';

@Module({
  controllers: [HistoriaUsuarioController],
  providers: [HistoriaUsuarioService],
})
export class HistoriaUsuarioModule {}
