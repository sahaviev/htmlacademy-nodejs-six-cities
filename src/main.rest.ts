// http://design-pattern.ru/patterns/registry.html
// https://www.calabonga.net/blog/post/dependency-injection-principle-pattern-container#:~:text=Паттерн%20внедрение%20зависимостей%20(Dependency%20Injection,(lifetime)%2C%20то%20есть%20временем

// https://refactoring.guru/ru/design-patterns/builder

import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication } from './rest/index.js';
import { Component } from './shared/types/index.js';
import { createCityContainer } from './shared/modules/city/index.js';
import { createCommentContainer } from './shared/modules/comment/index.js';
import { createFeatureContainer } from './shared/modules/feature/index.js';
import { createOfferContainer } from './shared/modules/offer/index.js';
import { createUserContainer } from './shared/modules/user/index.js';
import { createAuthContainer } from './shared/modules/auth/index.js';
import { createRestApplicationContainer } from './rest/rest.container.js';

async function bootstrap() {
  const appContainer = Container.merge(
    createCityContainer(),
    createCommentContainer(),
    createFeatureContainer(),
    createRestApplicationContainer(),
    createOfferContainer(),
    createUserContainer(),
    createAuthContainer(),
  );
  const application = appContainer.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
