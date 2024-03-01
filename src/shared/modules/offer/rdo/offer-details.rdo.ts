import { Expose, Type } from 'class-transformer';
import { CityRdo } from '../../city/rdo/city.rdo.js';
import { UserRdo } from '../../user/rdo/user.rdo.js';

export class OfferDetailsRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public createdAt: string;

  @Expose()
  public previewImage: string;

  @Expose()
  public images: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public type: string;

  @Expose()
  public bedrooms: number;

  @Expose()
  public maxAdults: number;

  @Expose()
  public price: number;

  @Expose()
  public features: string[];

  @Expose()
  public location: {
    latitude: string;
    longitude: string;
  };

  @Expose()
  public commentsCount: number;

  @Expose()
  public rating: number;

  @Expose({ name: 'cityId'})
  @Type(() => CityRdo)
  public city: CityRdo;

  @Expose({ name: 'userId'})
  @Type(() => UserRdo)
  public user: UserRdo;
}
