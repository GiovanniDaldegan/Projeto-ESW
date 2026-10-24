import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateProjetoDto {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  nome: string;

  @IsNotEmpty({ message: 'O ID do usuário é obrigatório.' })
  @IsInt({ message: 'O ID do usuário deve ser um número inteiro.' })
  idUsuario: number;
}
