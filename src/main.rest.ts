// http://design-pattern.ru/patterns/registry.html
// https://www.calabonga.net/blog/post/dependency-injection-principle-pattern-container#:~:text=Паттерн%20внедрение%20зависимостей%20(Dependency%20Injection,(lifetime)%2C%20то%20есть%20временем

// https://refactoring.guru/ru/design-patterns/builder

import 'reflect-metadata';
import { Container } from 'inversify';
import { Logger, PinoLogger } from './shared/libs/logger/index.js';
import { RestApplication } from './rest/index.js';
import { Config, RestConfig, RestSchema } from './shared/libs/config/index.js';
import { Component } from './shared/types/index.js';

async function bootstrap() {
  const container = new Container();
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();

  const application = container.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();