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
import { CreateOfferValidationMessage } from './create-offer.messages.js';
import { Type } from 'class-transformer';

class LocationDto {
  @IsNumber( { allowNaN: false, allowInfinity: false },{ message: CreateOfferValidationMessage.location.latitude.invalidFormat })
  latitude: number;

  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: CreateOfferValidationMessage.location.longitude.invalidFormat })
  longitude: number;
}

export class CreateOfferDto {
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description: string;

  @IsString({ message: CreateOfferValidationMessage.previewImage.invalidFormat })
  @MaxLength(256, { message: CreateOfferValidationMessage.previewImage.maxLength })
  public previewImage: string;

  @IsString({ each: true, message: CreateOfferValidationMessage.images.invalidFormat })
  @MaxLength(256, { each: true, message: CreateOfferValidationMessage.images.maxLength })
  public images: string[];

  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalidFormat })
  public isPremium: boolean;

  @IsEnum(OfferType, { message: CreateOfferValidationMessage.type.invalid })
  public type: OfferType;

  @IsInt({ message: CreateOfferValidationMessage.bedrooms.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.bedrooms.minValue })
  @Max(8, { message: CreateOfferValidationMessage.bedrooms.maxValue })
  public bedrooms: number;

  @IsInt({ message: CreateOfferValidationMessage.maxAdults.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.maxAdults.minValue })
  @Max(10, { message: CreateOfferValidationMessage.maxAdults.maxValue })
  public maxAdults: number;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.price.maxValue })
  public price: number;

  @IsArray({ message: CreateOfferValidationMessage.features.invalidFormat })
  @IsMongoId({ each: true, message: CreateOfferValidationMessage.features.invalidId })
  public features: string[];

  @ValidateNested({ message: CreateOfferValidationMessage.location.invalidFormat })
  @Type(() => LocationDto)
  public location: LocationDto;

  @IsMongoId({ message: CreateOfferValidationMessage.cityId.invalidId })
  public cityId: string;

  public userId: string;
}

