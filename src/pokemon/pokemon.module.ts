import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 1000000,
      maxRedirects: 5,
    }),
  ],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}
