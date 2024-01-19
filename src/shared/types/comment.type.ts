import { User } from './user.type.js';

export type Comment = {
  id: string;
  comment: string;
  date: string;
  rating: number;
  user: User;
};
