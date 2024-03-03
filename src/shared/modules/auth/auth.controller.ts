import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  BaseController,
  HttpError,
  HttpMethod,
  ValidateDtoMiddleware,
} from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { UserService, UserRdo } from '../user/index.js';
import { fillDTO } from '../../helpers/index.js';
import { LoginDto } from './dto/login.dto.js';
import { LoggedRdo } from './rdo/logged.rdo.js';
import { AuthService } from '../auth/index.js';
import { RequestBody, RequestParams } from '../../libs/rest/index.js';
import { PrivateRouteMiddleware } from '../../libs/rest/middleware/private-route.middleware.js';

@injectable()
export class AuthController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.AuthService) private readonly authService: AuthService,
  ) {
    super(logger);
    this.logger.info('Register routes for AuthController…');
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [
        new ValidateDtoMiddleware(LoginDto),
      ]
    });
    this.addRoute({
      path: "/logout",
      method: HttpMethod.Post,
      handler: this.logout,
      middlewares:[
        new PrivateRouteMiddleware(),
      ],
    });
    this.addRoute({
      path: '/session',
      method: HttpMethod.Get,
      handler: this.session,
      middlewares: [
        new PrivateRouteMiddleware(),
      ],
    });
  }

  public async login(
    { body }: Request<RequestParams, RequestBody, LoginDto>,
    res: Response,
  ): Promise<void> {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);
    this.ok(res, fillDTO(LoggedRdo, { email: user.email, token }));
  }

  public async logout({ tokenPayload: { email }}: Request) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'AuthController'
      );
    }
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      "Not implemented",
      "UserController",
    );
  }

  public async session({ tokenPayload: { email }}: Request, res: Response) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'AuthController'
      );
    }
    this.ok(res, fillDTO(UserRdo, user));
  }
}
