import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { CustomPokemonModule } from './custom-pokemon/custom-pokemon.module';

import * as path from 'path';
import { config } from 'dotenv';
config({
  path: process.env.NODE_ENV === 'development' ? '.env.development' : '.env',
});

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.URL_DATABASE,
      synchronize: true,
      logging: false,
      migrationsRun: false,
      entities: [path.join(__dirname, './**/*.entity{.ts,.js}')],
      ssl: false,
    }),
    AuthModule,
    UserModule,
    PokemonModule,
    CustomPokemonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
