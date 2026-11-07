import { PartialType } from '@nestjs/mapped-types';
import { CreateCriterioAceitacaoDto } from './create-criterio-aceitacao.dto';

export class UpdateCriterioAceitacaoDto extends PartialType(
  CreateCriterioAceitacaoDto,
) {}
