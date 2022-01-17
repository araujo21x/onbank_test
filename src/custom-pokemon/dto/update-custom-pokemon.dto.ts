import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomPokemonDto } from './create-custom-pokemon.dto';

export class UpdateCustomPokemonDto extends PartialType(
  CreateCustomPokemonDto,
) {}
