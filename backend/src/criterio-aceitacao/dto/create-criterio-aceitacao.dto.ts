import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateCriterioAceitacaoDto {
  @IsNotEmpty({ message: 'O ID da história de usuário é obrigatório.' })
  @IsInt({ message: 'O ID da história de usuário deve ser um número inteiro.' })
  idHu: number;

  @IsNotEmpty({ message: 'O campo "dado" é obrigatório.' })
  @IsString({ message: 'O campo "dado" deve ser uma string.' })
  dado: string;

  @IsNotEmpty({ message: 'O campo "quando" é obrigatório.' })
  @IsString({ message: 'O campo "quando" deve ser uma string.' })
  quando: string;

  @IsNotEmpty({ message: 'O campo "então" é obrigatório.' })
  @IsString({ message: 'O campo "então" deve ser uma string.' })
  entao: string;
}
