import { Injectable } from '@nestjs/common';
import { CreateCustomPokemonDto } from './dto/create-custom-pokemon.dto';
import { UpdateCustomPokemonDto } from './dto/update-custom-pokemon.dto';

@Injectable()
export class CustomPokemonService {
  create(createCustomPokemonDto: CreateCustomPokemonDto) {
    return 'This action adds a new customPokemon';
  }

  findAll() {
    return `This action returns all customPokemon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customPokemon`;
  }

  update(id: number, updateCustomPokemonDto: UpdateCustomPokemonDto) {
    return `This action updates a #${id} customPokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} customPokemon`;
  }
}
