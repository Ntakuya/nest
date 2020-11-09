import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from './app/core/filters/http-exception.filter';
import { ValidationPipe } from './app/core/pipes/validation.pipe';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;

  // status exception filter
  app.useGlobalFilters(new HttpExceptionFilter())

  // set to global with validaton pipe
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
