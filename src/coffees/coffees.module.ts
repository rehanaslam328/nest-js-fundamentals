import { Injectable, Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { COFFEE_BRANDS } from './coffee.constants';
import { Connection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import coffessConfig from './config/coffees.config'
// Class based providers
class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

// Factory based providers
@Injectable()
export class CoffeeBrandsFactory {
  create() {
    return ['buddy brew', 'nescafe'];
  } 
}

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event]), ConfigModule.forFeature(coffessConfig)],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    CoffeeBrandsFactory,
    {
      // class based providers
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'development'
          ? DevelopmentConfigService
          : ProductionConfigService,
    },
    {
      // no-class based providers
      //   provide: COFFEE_BRANDS,
      //   useValue: ['buddy brew', 'nescafe'],

      // factory based providers
      provide: COFFEE_BRANDS,
      //   useFactory: () => ['buddy brew', 'nescafe'],
    //   useFactory: (brandsFactory: CoffeeBrandsFactory) =>
    //     brandsFactory.create(),
      inject: [CoffeeBrandsFactory],
      // Asynchronous providers
      useFactory: async (connection:Connection):Promise<string[]>=>{
        // const coffeeBrands = await connection.query('SELECT * FROM coffee_brands');
        const coffeebrands = await Promise.resolve(['buddy brew', 'nescafe']);
        return coffeebrands;
      }
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
