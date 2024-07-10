import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { DatabaseModule } from './database/database.module';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DynamicDatabaseModule } from './dynamicdatabase/database/database.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [DatabaseModule, CoffeesModule, CoffeeRatingModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
