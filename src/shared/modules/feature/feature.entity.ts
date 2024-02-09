import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { Feature } from '../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface FeatureEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'features',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class FeatureEntity extends defaultClasses.TimeStamps implements Feature {
  @prop({required: true, trim: true})
  public name!: string;
}

export const FeatureModel = getModelForClass(FeatureEntity);
