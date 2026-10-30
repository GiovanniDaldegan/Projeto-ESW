import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsInt, IsDate } from 'class-validator';

export class CreateSprintDto {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  nome: string;

  @IsNotEmpty({ message: 'O ID do projeto é obrigatório.' })
  @IsInt({ message: 'O ID do projeto deve ser um número inteiro.' })
  idProjeto: number;

  @IsNotEmpty({ message: 'A data de início é obrigatória.' })
  @Type(() => Date)
  @IsDate({ message: 'A data de início deve ser uma data válida.' })
  init: Date;

  @IsNotEmpty({ message: 'A data de término é obrigatória.' })
  @Type(() => Date)
  @IsDate({ message: 'A data de término deve ser uma data válida.' })
  finish: Date;
}
