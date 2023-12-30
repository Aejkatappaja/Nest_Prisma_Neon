import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeeModule } from './employee/employee.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MyLoggerModule } from './my-logger/my-logger.module';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    EmployeeModule,
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      // NO MORE THAN 3 REQUESTS by second
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
    MyLoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    ChatGateway,
  ],
})
export class AppModule {}
