import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsIn,
  IsNumber,
} from 'class-validator';

export class CreateHistoriaUsuarioDto {
  @IsNotEmpty({ message: 'A história é obrigatória.' })
  @IsString({ message: 'A história deve ser uma string.' })
  historia: string;

  @IsNotEmpty({ message: 'O ID do backlog é obrigatório.' })
  @IsInt({ message: 'O ID do backlog deve ser um número inteiro.' })
  idBacklog: number;

  @IsOptional()
  @IsInt({ message: 'O ID do épico deve ser um número inteiro.' })
  idEpico?: number | null;

  @IsOptional()
  @IsIn(['m', 's', 'c', 'w'], {
    message: 'O MoSCoW deve ser m, s, c ou w.',
  })
  mscw?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Os story points devem ser um número.' })
  storyPoints?: number;

  @IsOptional()
  @IsNumber({}, { message: 'O reach deve ser um número.' })
  reach?: number;

  @IsOptional()
  @IsNumber({}, { message: 'O impact deve ser um número.' })
  impact?: number;

  @IsOptional()
  @IsNumber({}, { message: 'O confidence deve ser um número.' })
  confidence?: number;

  @IsOptional()
  @IsNumber({}, { message: 'O RICE deve ser um número.' })
  rice?: number;
}
