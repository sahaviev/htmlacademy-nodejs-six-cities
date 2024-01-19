import { Location } from './location.type.js';

export const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export type CityName = typeof CITIES[number];

export type City = {
  name: CityName;
  location: Location;
};
