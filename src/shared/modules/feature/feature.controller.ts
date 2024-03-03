import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BaseController, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { fillDTO } from '../../helpers/index.js';
import { FeatureService } from './feature-service.interface.js';
import { FeatureRdo } from './rdo/feature.rdo.js';

@injectable()
export class FeatureController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.FeatureService) private readonly featureService: FeatureService,
  ) {
    super(logger);
    this.logger.info('Register routes for FeatureController...');
    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const features = await this.featureService.find();
    this.ok(res, fillDTO(FeatureRdo, features));
  }
}
