import { inject, injectable } from 'inversify';
import { ObjectId } from 'mongodb';
import { OfferService } from './offer-service.interface.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Sorting } from '../../types/sorting.enum.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { OFFERS_LIMIT, PREMIUM_OFFERS_LIMIT } from './offer.constant.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
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
    const offers= await this.offerModel
      .aggregate([
        { $match: { _id: new ObjectId(offerId) } },
        {
          $lookup: {
            from: 'comments',
            let: { offerId: '$_id' },
            pipeline: [
              { $match: { $expr: { $eq: ['$offerId', '$$offerId'] } } },
              { $group: { _id: null, averageRating: { $avg: '$rating' }, commentsCount: { $sum: 1 } } },
            ],
            as: 'comments'
          }
        },
        {
          $lookup: {
            from: 'cities',
            localField: 'cityId',
            foreignField: '_id',
            as: 'city'
          }
        },
        {
          $addFields: {
            id: { $toString: '$_id'},
            commentsCount: { $arrayElemAt: ['$comments.commentsCount', 0] },
            averageRating: { $arrayElemAt: ['$comments.averageRating', 0] },
            city: { $arrayElemAt: ['$city', 0] }
          }
        },
        {
          $unset: 'comments'
        },
      ])
      .exec();

    if(offers) {
      return offers[0];
    } else {
      return null;
    }
  }

  public async find(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .aggregate([
        {
          $lookup: {
            from: 'comments',
            let: { offerId: '$_id' },
            pipeline: [
              { $match: { $expr: { $eq: ['$offerId', '$$offerId'] } } },
              { $group: { _id: null, averageRating: { $avg: '$rating' }, commentsCount: { $sum: 1 } } },
            ],
            as: 'comments'
          }
        },
        {
          $lookup: {
            from: 'cities',
            localField: 'cityId',
            foreignField: '_id',
            as: 'city'
          }
        },
        {
          $addFields: {
            id: { $toString: '$_id'},
            commentsCount: { $arrayElemAt: ['$comments.commentsCount', 0] },
            averageRating: { $arrayElemAt: ['$comments.averageRating', 0] },
            city: { $arrayElemAt: ['$city', 0] }
          }
        },
        {
          $unset: 'comments'
        },
        {
          $limit: OFFERS_LIMIT
        },
      ])
      .exec();
  }

  public async findPremiumOffersByCity(cityId: string): Promise<DocumentType<OfferEntity>[]> {
    return await this.offerModel
      .aggregate([
        { $match: { cityId: new ObjectId(cityId), isPremium: true } },
        {
          $lookup: {
            from: 'cities',
            localField: 'cityId',
            foreignField: '_id',
            as: 'city'
          }
        },
        { $sort: { createdAt: Sorting.Descending } },
        { $addFields: { id: {$toString: '$_id'} } },
        { $limit: PREMIUM_OFFERS_LIMIT },
      ]).exec();
  }

  public async updateOfferStatistics(offerId: string, rating: string): Promise<DocumentType<OfferEntity> | null> {
    return await this.offerModel
      .findByIdAndUpdate(offerId,
        { $inc: { commentsCount: 1 }, rating },
        { new: true }
      ).exec();
  }

  public async deleteById(offerId: string): Promise<unknown> {
     return this.offerModel
       .deleteOne({_id: offerId});
  }
}
