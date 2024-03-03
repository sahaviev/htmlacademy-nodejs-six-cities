import { IsEmail, IsString } from 'class-validator';
import { LoginMessages } from './login.messages.js';

export class LoginDto {
  @IsEmail({}, { message: LoginMessages.email.invalidFormat })
  public email: string;

  @IsString({ message: LoginMessages.password.invalidFormat })
  public password: string;
}
