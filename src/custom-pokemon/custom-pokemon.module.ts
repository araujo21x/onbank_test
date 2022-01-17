import { Module } from '@nestjs/common';
import { CustomPokemonService } from './custom-pokemon.service';
import { CustomPokemonController } from './custom-pokemon.controller';

@Module({
  controllers: [CustomPokemonController],
  providers: [CustomPokemonService],
})
export class CustomPokemonModule {}
