import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsMongoId,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { OfferType } from '../../../types/index.js';
import { UpdateOfferValidationMessage } from './update-offer.messages.js';
import { Type } from 'class-transformer';

class LocationDto {
  @IsNumber( { allowNaN: false, allowInfinity: false },{ message: UpdateOfferValidationMessage.location.latitude.invalidFormat })
  latitude: number;

  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: UpdateOfferValidationMessage.location.longitude.invalidFormat })
  longitude: number;
}

export class UpdateOfferDto {
  @MinLength(10, { message: UpdateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: UpdateOfferValidationMessage.title.maxLength })
  public title: string;

  @MinLength(20, { message: UpdateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: UpdateOfferValidationMessage.description.maxLength })
  public description: string;

  @IsString({ message: UpdateOfferValidationMessage.previewImage.invalidFormat })
  @MaxLength(256, { message: UpdateOfferValidationMessage.previewImage.maxLength })
  public previewImage: string;

  @IsString({ each: true, message: UpdateOfferValidationMessage.images.invalidFormat })
  @MaxLength(256, { each: true, message: UpdateOfferValidationMessage.images.maxLength })
  public images: string[];

  @IsBoolean({ message: UpdateOfferValidationMessage.isPremium.invalidFormat })
  public isPremium: boolean;

  @IsEnum(OfferType, { message: UpdateOfferValidationMessage.type.invalid })
  public type: OfferType;

  @IsInt({ message: UpdateOfferValidationMessage.bedrooms.invalidFormat })
  @Min(1, { message: UpdateOfferValidationMessage.bedrooms.minValue })
  @Max(8, { message: UpdateOfferValidationMessage.bedrooms.maxValue })
  public bedrooms: number;

  @IsInt({ message: UpdateOfferValidationMessage.maxAdults.invalidFormat })
  @Min(1, { message: UpdateOfferValidationMessage.maxAdults.minValue })
  @Max(10, { message: UpdateOfferValidationMessage.maxAdults.maxValue })
  public maxAdults: number;

  @IsInt({ message: UpdateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: UpdateOfferValidationMessage.price.minValue })
  @Max(100000, { message: UpdateOfferValidationMessage.price.maxValue })
  public price: number;

  @IsArray({ message: UpdateOfferValidationMessage.features.invalidFormat })
  @IsMongoId({ each: true, message: UpdateOfferValidationMessage.features.invalidId })
  public features: string[];

  @ValidateNested({ message: UpdateOfferValidationMessage.location.invalidFormat })
  @Type(() => LocationDto)
  public location: LocationDto;

  @IsMongoId({ message: UpdateOfferValidationMessage.cityId.invalidId })
  public cityId: string;
}
