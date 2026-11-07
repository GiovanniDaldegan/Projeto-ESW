import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateBacklogDto {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  nome: string;

  @IsNotEmpty({ message: 'O ID do projeto é obrigatório.' })
  @IsInt({ message: 'O ID do projeto deve ser um número inteiro.' })
  idProjeto: number;
}
