import { OfferType, PartialOffer, UserType } from '../types/index.js';

export function createOffer(offerData: string): PartialOffer{
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
    type,
    bedrooms,
    maxAdults,
    price,
    features,
    latitude,
    longitude,
    userName,
    userEmail,
    userAvatarUrl,
    userType,
  ] = offerData.replace('\n', '').split('\t');

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
    type: type as OfferType,
    bedrooms: Number(bedrooms),
    maxAdults: Number(maxAdults),
    price: Number(price),
    features: features.split(';'),
    location: {
      latitude: Number(latitude),
      longitude: Number(longitude),
    },
    user: {
      name: userName,
      email: userEmail,
      avatarUrl: userAvatarUrl,
      type: userType as UserType,
    }
  };
}
