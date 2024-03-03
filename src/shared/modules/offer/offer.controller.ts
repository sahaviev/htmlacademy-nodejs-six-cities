import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import {
  BaseController, DocumentExistsMiddleware,
  HttpError,
  HttpMethod,
  RequestBody,
  RequestParams,
  ValidateDtoMiddleware, ValidateObjectIdMiddleware,
} from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { PrivateRouteMiddleware } from '../../libs/rest/middleware/private-route.middleware.js';
import { Component } from '../../types/index.js';
import { fillDTO, fillFavorites } from '../../helpers/index.js';
import { OfferService } from './offer-service.interface.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { OfferDetailsRdo } from './rdo/offer-details.rdo.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { StatusCodes } from 'http-status-codes';
import { CommentService, CommentRdo } from '../comment/index.js';
import { UserService } from '../user/index.js';
import { ParamOfferId } from './types/param-offerid.type.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.CommentService) private readonly commentService: CommentService,
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController...');
    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto),
      ]
    });
    this.addRoute({
      path: '/premium',
      method: HttpMethod.Get,
      handler: this.getPremiumOffers
    });
    this.addRoute({
      path: '/favorite',
      method: HttpMethod.Get,
      handler: this.getFavoriteOffers,
      middlewares: [
        new PrivateRouteMiddleware(),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId/favorite',
      method: HttpMethod.Patch,
      handler: this.addToFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId/favorite',
      method: HttpMethod.Delete,
      handler: this.deleteOfferFromFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
  }

  public async index({ tokenPayload }: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const user = tokenPayload ? await this.userService.findById(tokenPayload.id) : null;
    this.ok(res, fillDTO(OfferRdo, fillFavorites(offers, user)));
  }

  public async show({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);
    this.ok(res, fillDTO(OfferDetailsRdo, offer));
  }

  public async create(
    { tokenPayload, body }: Request<RequestParams, RequestBody, CreateOfferDto>,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create({ ...body, userId: tokenPayload.id });
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferDetailsRdo, offer));
  }

  public async update(
    { tokenPayload, params, body }: Request<ParamOfferId, RequestBody, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);
    if (offer?.userId.id !== tokenPayload.id) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        `Access Denied`,
        'OfferController'
      );
    }

    const result = await this.offerService.update(offerId, body);
    if (!result) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id «${offerId}» not found.`,
        'OfferController'
      );
    }
    const updated = await this.offerService.findById(result.id);
    this.ok(res, fillDTO(OfferDetailsRdo, updated));
  }

  public async delete(
    { tokenPayload, params }: Request<ParamOfferId>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);
    if (offer?.userId.id !== tokenPayload.id) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        `Access Denied`,
        'OfferController'
      );
    }
    await this.offerService.deleteById(offerId);
    this.noContent(res, undefined);
  }

  public async getPremiumOffers(req: Request, res: Response): Promise<void> {
    const cityId = req.query.cityId as string;
    const offers = await this.offerService.findPremiumOffersByCity(cityId);
    this.ok(res, fillDTO(OfferDetailsRdo, offers));
  }

  public async getComments({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const comments = await this.commentService.findByOfferId(offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

  public async getFavoriteOffers({ tokenPayload }: Request<ParamOfferId>, res: Response): Promise<void> {
    const user = await this.userService.findById(tokenPayload.id);
    if (!user) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `User with id «${tokenPayload.id}» not found.`,
        'OfferController'
      );
    }
    const offers = await this.offerService.findOffersByIds(user.favorites);
    this.ok(res, fillDTO(OfferDetailsRdo, offers));
  }

  public async addToFavorite({ tokenPayload, params }: Request<ParamOfferId>, res: Response) {
    const { offerId } = params;
    const user = await this.userService.findById(tokenPayload.id);
    if (!user?.favorites.includes(offerId)) {
      await this.userService.addOfferToFavorites(tokenPayload.id, offerId);
    }
    const offer = await this.offerService.findById(offerId);
    this.ok(res, fillDTO(OfferDetailsRdo, offer));
  }

  public async deleteOfferFromFavorite({ tokenPayload, params }: Request<ParamOfferId>, res: Response) {
    const { offerId } = params;
    const user = await this.userService.findById(tokenPayload.id);
    if (user?.favorites.includes(offerId)) {
      await this.userService.deleteOfferFromFavorites(tokenPayload.id, offerId);
    }
    this.noContent(res, null);
  }
}
