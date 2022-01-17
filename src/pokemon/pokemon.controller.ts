import { Controller, Get, Param, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  public async findAll(
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    return await this.pokemonService.findAll(Number(limit), Number(page));
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.pokemonService.findOne(Number(id));
  }
}
