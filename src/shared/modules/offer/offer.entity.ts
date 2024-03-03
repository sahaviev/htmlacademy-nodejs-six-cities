import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Location, OfferType } from '../../types/index.js';
import { CityEntity } from '../city/index.js';
import { UserEntity } from '../user/index.js';
import { FeatureEntity } from '../feature/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true, minlength: 10, maxlength: 100 })
  public title!: string;

  @prop({ trim: true, minlength: 20, maxlength: 1024 })
  public description!: string;

  @prop()
  public previewImage!: string;

  @prop({
    required: true,
    default: [],
  })
  public images!: string[];

  @prop()
  public isPremium!: boolean;

  @prop({
    required: false,
  })
  public isFavorite!: boolean;

  @prop({ min: 1, max: 5, default: null })
  public rating!: number;

  @prop({ default: 0 })
  public commentsCount!: number;

  @prop({
    type: () => String,
    enum: OfferType
  })
  public type!: OfferType;

  @prop()
  public bedrooms!: number;

  @prop()
  public maxAdults!: number;

  @prop()
  public price!: number;

  @prop()
  public location!: Location;

  @prop({
    ref: FeatureEntity,
    required: true,
    default: [],
    _id: false
  })
  public features!: Ref<FeatureEntity>[];

  @prop({
    ref: CityEntity,
    required: true,
  })
  public cityId!: Ref<CityEntity>;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;
}

export const OfferModel = getModelForClass(OfferEntity);
