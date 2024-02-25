import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  update(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  updateOfferStatistics(offerId: string, rating: string): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<unknown>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  find(): Promise<DocumentType<OfferEntity>[] | null>;
  findPremiumOffersByCity(cityId: string): Promise<DocumentType<OfferEntity>[] | null>;
}
