import { Offer, OfferType } from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    publishDate,
    cityName,
    cityLatitude,
    cityLongitude,
    previewImage,
    images,
    isPremium,
    isFavorite,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    latitude,
    longitude,
  ] = offerData.split('\t');

  return {
    title,
    description,
    publishDate: new Date(publishDate),
    city: {
      name: cityName,
      location: {
        latitude: Number(cityLatitude),
        longitude: Number(cityLongitude),
      },
    },
    previewImage,
    images: images.split(';'),
    isPremium: isPremium === "true",
    isFavorite: isFavorite === "true",
    rating: Number.parseFloat(rating),
    type: type as OfferType,
    bedrooms: Number(bedrooms),
    maxAdults: Number(maxAdults),
    price: Number(price),
    goods: goods.split(';'),
    location: {
      latitude: Number(latitude),
      longitude: Number(longitude),
    },
  };
}
