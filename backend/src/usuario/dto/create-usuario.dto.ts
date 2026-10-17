import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  nome: string;

  @IsNotEmpty({ message: 'O email é obrigatório.' })
  @IsEmail({}, { message: 'O email deve ser válido.' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @IsString({ message: 'A senha deve ser uma string.' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  senha: string;
}
