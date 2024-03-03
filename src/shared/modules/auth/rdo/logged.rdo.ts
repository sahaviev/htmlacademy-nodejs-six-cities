import { Expose } from 'class-transformer';

export class LoggedRdo {
  @Expose()
  public token: string;

  @Expose()
  public email: string;
}
