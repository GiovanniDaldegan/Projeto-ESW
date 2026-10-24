import { PartialType } from '@nestjs/mapped-types';
import { CreateHistoriaUsuarioDto } from './create-historia-usuario.dto';

export class UpdateHistoriaUsuarioDto extends PartialType(
  CreateHistoriaUsuarioDto,
) {}
