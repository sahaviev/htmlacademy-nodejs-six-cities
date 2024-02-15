import { User } from './user.type.js';

export type Comment = {
  id: string;
  text: string;
  publishDate: Date;
  rating: number;
  user: User;
};
