import { Module } from '@nestjs/common';
import { EpicoService } from './epico.service';
import { EpicoController } from './epico.controller';

@Module({
  controllers: [EpicoController],
  providers: [EpicoService],
})
export class EpicoModule {}
