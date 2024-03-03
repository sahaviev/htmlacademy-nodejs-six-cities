import { inject, injectable } from 'inversify';
import { ObjectId } from 'mongodb';
import { OfferService } from './offer-service.interface.js';
import { Component, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { OFFERS_LIMIT, PREMIUM_OFFERS_LIMIT } from './offer.constant.js';
import { CommentStatistics } from '../comment/types/comment-statistics.type.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);
    return result;
  }

  public async update(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    const result = await this.offerModel
      .findByIdAndUpdate(offerId, dto)
      .exec();
    this.logger.info(`Offer updated: ${dto.title}`);
    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['userId', 'cityId'])
      .exec();
  }

  public async find(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .populate(['userId', 'cityId'])
      .limit(OFFERS_LIMIT)
      .sort({ createdAt: SortType.Descending })
      .exec();
  }

  public async findPremiumOffersByCity(cityId: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({ cityId: new ObjectId(cityId), isPremium: true })
      .populate(['userId', 'cityId'])
      .limit(PREMIUM_OFFERS_LIMIT)
      .sort({ createdAt: SortType.Descending })
      .exec();
  }

  public async findOffersByIds(offersIds: string[]): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({'_id':{$in: offersIds}})
      .populate(['userId', 'cityId'])
      .limit(OFFERS_LIMIT)
      .sort({ createdAt: SortType.Descending })
      .exec();
  }

  public async updateOfferStatistics(offerId: string, statistics: CommentStatistics): Promise<DocumentType<OfferEntity> | null> {
    return await this.offerModel
      .findByIdAndUpdate(offerId, statistics)
      .exec();
  }

  public async deleteById(offerId: string): Promise<unknown> {
     return this.offerModel
       .deleteOne({_id: offerId});
  }

  public async exists(documentId: string): Promise<boolean> {
    return (
      await this.offerModel
        .exists({_id: documentId})
    ) !== null;
  }
}
