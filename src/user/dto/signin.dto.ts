import { IsEmail, IsNotEmpty } from 'class-validator';

export class SigninDto {
  @IsNotEmpty({ message: 'Informe o seu e-mail' })
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsNotEmpty({ message: 'Informe a sua senha' })
  password: string;
}
