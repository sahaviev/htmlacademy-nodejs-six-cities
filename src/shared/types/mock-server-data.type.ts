import { City } from './city.type.js';
import { OfferType } from './offer-type.enum.js';

export type MockServerData = {
  titles: string[];
  descriptions: string[];
  cities: City[];
  previewImages: string[];
  images: string[];
  types: OfferType[];
  goods: string[];
};
