export const UpdateOfferValidationMessage = {
  title: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  previewImage: {
    invalidFormat: 'previewImage should be string',
    maxLength: 'Too big for field «previewImage»',
  },
  images: {
    invalidFormat: 'images should be array of string',
    maxLength: 'Too big for field «image»',
  },
  isPremium: {
    invalidFormat: 'isPremium must be a boolean',
  },
  type: {
    invalid: 'type must be one of "apartment", "house", "room" or "hotel"',
  },
  price: {
    invalidFormat: 'price must be an integer',
    minValue: 'Minimum price is 100',
    maxValue: 'Maximum price is 100000',
  },
  bedrooms: {
    invalidFormat: 'bedrooms must be an integer',
    minValue: 'Minimum bedrooms is 1',
    maxValue: 'Maximum bedrooms is 8',
  },
  maxAdults: {
    invalidFormat: 'maxAdults must be an integer',
    minValue: 'Minimum maxAdults is 1',
    maxValue: 'Maximum maxAdults is 10',
  },
  features: {
    invalidFormat: 'features must be an array',
    invalidId: 'features field must be an array of valid id',
  },
  location: {
    invalidFormat: 'location must be an object',
    latitude: {
      invalidFormat: 'location latitude must be an integer',
    },
    longitude: {
      invalidFormat: 'location longitude must be an integer',
    }
  },
  cityId: {
    invalidId: 'userId field must be a valid id',
  },
} as const;
