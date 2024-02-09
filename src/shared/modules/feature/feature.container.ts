import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../types/index.js';
import { FeatureService } from './feature-service.interface.js';
import { DefaultFeatureService } from './feature.service.js';
import { FeatureEntity, FeatureModel } from './feature.entity.js';

export function createFeatureContainer() {
  const featureContainer = new Container();

  featureContainer.bind<FeatureService>(Component.FeatureService).to(DefaultFeatureService);
  featureContainer.bind<types.ModelType<FeatureEntity>>(Component.FeatureModel).toConstantValue(FeatureModel);

  return featureContainer;
}
