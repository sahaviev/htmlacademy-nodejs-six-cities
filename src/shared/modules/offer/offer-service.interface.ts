import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { DocumentExists } from '../../types/index.js';
import { CommentStatistics } from '../comment/types/comment-statistics.type.js';

export interface OfferService extends DocumentExists {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  update(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  updateOfferStatistics(offerId: string, statistics: CommentStatistics): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<unknown>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findOffersByIds(offerIds: string[]): Promise<DocumentType<OfferEntity>[] | null>;
  find(limit?: number): Promise<DocumentType<OfferEntity>[] | null>;
  findPremiumOffersByCity(cityId: string): Promise<DocumentType<OfferEntity>[] | null>;
}
