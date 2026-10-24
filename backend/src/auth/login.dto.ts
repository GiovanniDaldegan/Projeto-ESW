import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class LoginDto {
    @IsEmail({}, { message: 'O email deve ser válido.' })
    @IsNotEmpty({ message: 'O email é obrigatório.' })
    email: string;

    @IsNotEmpty({ message: 'A senha é obrigatória.' })
    senha: string;
}