import { UserType } from '../../../types/index.js';
import { MaxLength, MinLength } from 'class-validator';
import { CreateUserValidationMessage } from './create-user.messages.js';

export class CreateUserDto {
  @MinLength(1, { message: CreateUserValidationMessage.name.minLength })
  @MaxLength(15, { message: CreateUserValidationMessage.name.maxLength })
  public name: string;

  public email: string;
  public avatarUrl?: string;
  public type: UserType;

  @MinLength(6, { message: CreateUserValidationMessage.password.minLength })
  @MaxLength(12, { message: CreateUserValidationMessage.password.maxLength })
  public password: string;
}
