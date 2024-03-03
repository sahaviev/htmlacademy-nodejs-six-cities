import { LoginDto } from './index.js';
import { UserEntity } from '../user/index.js';

export interface AuthService {
  authenticate(user: UserEntity): Promise<string>;
  verify(dto: LoginDto): Promise<UserEntity>;
}
