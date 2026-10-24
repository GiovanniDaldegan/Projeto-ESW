import { PartialType } from '@nestjs/mapped-types';
import { CreateEpicoDto } from './create-epico.dto';

export class UpdateEpicoDto extends PartialType(CreateEpicoDto) {}
