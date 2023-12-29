import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';
// import { MyLoggerService } from './my-logger/my-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  //   ,
  //   {
  //   logger: ['verbose'],
  //   bufferLogs: true,
  // });
  // app.useLogger(app.get(MyLoggerService));
  await app.listen(3000);
  console.log('server is Running on port 3000');
}
bootstrap();
