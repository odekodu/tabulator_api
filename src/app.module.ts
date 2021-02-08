import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PageModule } from './page/page.module';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logger.interceptor';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/craterapi',
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useCreateIndex: true
      }
    ),
    PageModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }
  ],
})
export class AppModule { }
