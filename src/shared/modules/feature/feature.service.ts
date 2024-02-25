import { FeatureService } from './feature-service.interface.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { FeatureEntity } from './feature.entity.js';
import { CreateFeatureDto } from './dto/create-feature.dto.js';

@injectable()
export class DefaultFeatureService implements FeatureService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.FeatureModel) private readonly featureModel: types.ModelType<FeatureEntity>
  ) {}

  public async create(dto: CreateFeatureDto): Promise<DocumentType<FeatureEntity>> {
    const result = await this.featureModel.create(dto);
    this.logger.info(`New feature created: ${dto.name}`);
    return result;
  }

  public async find(): Promise<DocumentType<FeatureEntity>[]> {
    return this.featureModel
      .find()
      .exec();
  }

  public async findByFeatureName(name: string): Promise<DocumentType<FeatureEntity> | null> {
    return this.featureModel.findOne({name}).exec();
  }

  public async findByFeatureNameOrCreate(name: string, dto: CreateFeatureDto): Promise<DocumentType<FeatureEntity>> {
    const existedFeature = await this.findByFeatureName(name);

    if (existedFeature) {
      return existedFeature;
    }

    return this.create(dto);
  }
}
