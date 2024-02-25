import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BaseController, HttpError, HttpMethod, RequestBody, RequestParams } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferService } from './offer-service.interface.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { OfferDetailsRdo } from './rdo/offer-details.rdo.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/premium', method: HttpMethod.Get, handler: this.getPremiumOffers });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Get, handler: this.get });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Patch, handler: this.update });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Delete, handler: this.delete });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const response = fillDTO(OfferRdo, offers);
    this.ok(res, response);
  }

  public async get(req: Request, res: Response): Promise<void> {
    const offerId = req.params.offerId;
    const offer = await this.offerService.findById(offerId);
    const response = fillDTO(OfferDetailsRdo, offer);
    this.ok(res, response);
  }

  public async create(
    { body }: Request<RequestParams, RequestBody, CreateOfferDto>,
    res: Response
  ): Promise<void> {
    const response = await this.offerService.create(body);
    this.created(res, fillDTO(OfferDetailsRdo, response));
  }


  public async update(
    req: Request<RequestParams, RequestBody, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const offerId = req.params.offerId as string;
    const body = req.body;
    const response = await this.offerService.update(offerId, body);
    this.ok(res, fillDTO(OfferDetailsRdo, response));
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const offerId = req.params.offerId;

    const existsOffer = await this.offerService.findById(offerId);

    if (!existsOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id «${offerId}» not found.`,
        'OfferController'
      );
    }

    await this.offerService.deleteById(offerId);
    this.noContent(res, undefined);
  }

  public async getPremiumOffers(req: Request, res: Response): Promise<void> {
    const cityId = req.query.cityId as string;
    const offers = await this.offerService.findPremiumOffersByCity(cityId);
    const response = fillDTO(OfferDetailsRdo, offers);
    this.ok(res, response);
  }
}
