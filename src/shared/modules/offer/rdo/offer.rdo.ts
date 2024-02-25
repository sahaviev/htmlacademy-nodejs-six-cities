import { Expose, Type } from 'class-transformer';
import { CityRdo } from '../../city/rdo/city.rdo.js';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public createdAt: string;

  @Expose()
  public previewImage: string;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public type: string;

  @Expose()
  public price: number;

  @Expose()
  public commentsCount: number;

  @Expose()
  public averageRating: number;

  @Expose()
  @Type(() => CityRdo)
  public city: CityRdo;
}
