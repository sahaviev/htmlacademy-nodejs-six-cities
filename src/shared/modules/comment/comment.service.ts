import { CommentService } from './comment-service.interface.js';
import * as mongoose from "mongoose";
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const result = await this.commentModel.create(dto);
    this.logger.info(`New comment created: ${result._id}`);
    return result;
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[] | null> {
    return this.commentModel.find({ offerId }).exec();
  }

  public async getOfferStatistics(offerId: string): Promise<number> {
    const [{ rating }] = await this.commentModel.aggregate([
      { $match: { offerId: new mongoose.Types.ObjectId(offerId) } },
      {
        $group: {
          _id: null,
          totalRating: { $sum: "$rating" },
          totalComments: { $sum: 1 },
        },
      },
      {
        $project: {
          rating: { $divide: ["$totalRating", "$totalComments"] },
        },
      },
    ]);

    return Number(rating.toFixed(1));
  }
}
