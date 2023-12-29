import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { MyLoggerService } from './my-logger/my-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
