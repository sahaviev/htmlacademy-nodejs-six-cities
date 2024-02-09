export const Component = {
  RestApplication: Symbol.for('RestApplication'),
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
  DatabaseClient: Symbol.for('DatabaseClient'),
  CityService: Symbol.for('CityService'),
  CityModel: Symbol.for('CityModel'),
  FeatureService: Symbol.for('FeatureService'),
  FeatureModel: Symbol.for('FeatureModel'),
  OfferService: Symbol.for('OfferService'),
  OfferModel: Symbol.for('OfferModel'),
  UserService: Symbol.for('UserService'),
  UserModel: Symbol.for('UserModel'),
} as const;
