import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { Offer, OfferType } from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([
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
            ]) => ({
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
      }));
  }
}
