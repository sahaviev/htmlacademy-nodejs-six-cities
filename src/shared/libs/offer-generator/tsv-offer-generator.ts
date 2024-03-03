import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';

const MIN_BEDROOMS = 1;
const MAX_BEDROOMS = 8;

const MIN_ADULTS = 1;
const MAX_ADULTS = 10;

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem(this.mockData.titles);
    const description = getRandomItem(this.mockData.descriptions);
    const publishDate = dayjs()
      .subtract(generateRandomValue(1, 240), 'hours')
      .toISOString();
    const city = getRandomItem(this.mockData.cities);
    const previewImage = getRandomItem(this.mockData.previewImages);
    const images = getRandomItems(this.mockData.images).slice(0, 6).join(';');
    const isPremium = Boolean(generateRandomValue(0, 1));
    const type = getRandomItem(this.mockData.types);
    const maxAdults = generateRandomValue(MIN_ADULTS, MAX_ADULTS);
    const bedrooms = generateRandomValue(MIN_BEDROOMS, MAX_BEDROOMS);
    const price = generateRandomValue(MIN_PRICE / 10, MAX_PRICE / 10) * 10;
    const features = getRandomItems(this.mockData.features).join(';');

    const latitude = generateRandomValue(city.location.latitude - 0.1, city.location.latitude + 0.1, 6);
    const longitude = generateRandomValue(city.location.longitude - 0.1, city.location.longitude + 0.1, 6);

    const user = getRandomItem(this.mockData.users);

    return [
      title,
      description,
      publishDate,
      city.name,
      city.location.latitude,
      city.location.longitude,
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
      user.name,
      user.email,
      user.avatarUrl,
      user.type,
    ].join('\t');
  }
}
