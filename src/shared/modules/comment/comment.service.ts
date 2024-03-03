import { CommentService } from './comment-service.interface.js';
import { ObjectId } from 'mongodb';
import { inject, injectable } from 'inversify';
import { Component, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { CommentStatistics } from './types/comment-statistics.type.js';
import { COMMENTS_LIMIT } from './comment.constant.js';

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

  public async findById(commentId: string): Promise<DocumentType<CommentEntity> | null> {
    return this.commentModel
      .findById(commentId)
      .populate(['userId'])
      .exec();
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[] | null> {
    return this.commentModel
      .find({ offerId })
      .populate(['userId'])
      .limit(COMMENTS_LIMIT)
      .sort({ createdAt: SortType.Descending })
      .exec();
  }

  public async getOfferStatistics(offerId: string): Promise<CommentStatistics> {
    const [{ rating, commentsCount }] = await this.commentModel.aggregate([
      { $match: { offerId: new ObjectId(offerId) } },
      {
        $group: {
          _id: null,
          rating: { $avg: "$rating" },
          commentsCount: { $sum: 1 },
        },
      },
    ]);

    return { rating: Number(rating.toFixed(2)), commentsCount };
  }
}
