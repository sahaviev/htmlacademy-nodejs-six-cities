import { User } from './user.type.js';
import { City } from './city.type.js';
import { Location } from './location.type.js';
import { OfferType } from './offer-type.enum.js';

export type Offer = {
  title: string;
  description: string;
  publishDate: Date;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: OfferType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  features: string[];
  city: City;
  user: User;
  location: Location;
};

export type PartialOffer = Omit<Offer, 'isFavorite' | 'rating'> ;
