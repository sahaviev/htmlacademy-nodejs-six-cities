import { Expose } from 'class-transformer';

export class FeatureRdo {
  @Expose()
  public id: string;

  @Expose()
  public name: string;
}
