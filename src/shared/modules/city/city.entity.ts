import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { City, Location } from '../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CityEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'cities',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CityEntity extends defaultClasses.TimeStamps implements City {
  @prop({required: true, trim: true})
  public name!: string;

  @prop({ type: () => Object, required: true})
  public location!: Location;
}

export const CityModel = getModelForClass(CityEntity);
