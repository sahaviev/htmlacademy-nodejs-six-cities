import { DocumentType } from '@typegoose/typegoose';
import { CreateFeatureDto } from './dto/create-feature.dto.js';
import { FeatureEntity } from './feature.entity.js';

export interface FeatureService {
  create(dto: CreateFeatureDto): Promise<DocumentType<FeatureEntity>>;
  find(): Promise<DocumentType<FeatureEntity>[]>;
  findByFeatureName(name: string): Promise<DocumentType<FeatureEntity> | null>;
  findByFeatureNameOrCreate(name: string, dto: CreateFeatureDto): Promise<DocumentType<FeatureEntity>>;
}
