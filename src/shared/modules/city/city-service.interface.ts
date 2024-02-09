import {DocumentType} from '@typegoose/typegoose';
import { CreateCityDto } from './dto/create-city.dto.js';
import { CityEntity } from './city.entity.js';

export interface CityService {
  create(dto: CreateCityDto): Promise<DocumentType<CityEntity>>;
  findById(cityId: string): Promise<DocumentType<CityEntity> | null>;
  findByName(name: string): Promise<DocumentType<CityEntity> | null>;
  findByNameOrCreate(name: string, dto: CreateCityDto): Promise<DocumentType<CityEntity>>;
}
