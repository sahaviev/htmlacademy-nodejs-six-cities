import { UserType } from './user-type.enum.js';

export type User = {
  name: string;
  email: string;
  avatarUrl?: string;
  password: string;
  type: UserType;
}
