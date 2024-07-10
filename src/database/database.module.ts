import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: 'postgres',
        password: 'postgres',
        database: 'nest_course_coffee',
        autoLoadEntities: true,
        // entities: [__dirname + '/**/*.entity.{js,ts}','node_modules/hypt-models/dist/database/**/*.entity.{js,ts}'],
        synchronize: true,
        // ssl: true,
        // extra: {
        //   ssl: {
        //     rejectUnauthorized: false
        //   },
        // },
      }),
    }),
  ],
})

export class DatabaseModule {}