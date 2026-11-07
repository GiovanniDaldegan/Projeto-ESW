import { Module } from '@nestjs/common';
import { CriterioAceitacaoService } from './criterio-aceitacao.service';
import { CriterioAceitacaoController } from './criterio-aceitacao.controller';

@Module({
  controllers: [CriterioAceitacaoController],
  providers: [CriterioAceitacaoService],
})
export class CriterioAceitacaoModule {}
