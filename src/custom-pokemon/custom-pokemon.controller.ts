import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CustomPokemonService } from './custom-pokemon.service';
import { CreateCustomPokemonDto } from './dto/create-custom-pokemon.dto';
import { UpdateCustomPokemonDto } from './dto/update-custom-pokemon.dto';

@Controller('custom-pokemon')
export class CustomPokemonController {
  constructor(private readonly customPokemonService: CustomPokemonService) {}

  @Post()
  create(@Body() createCustomPokemonDto: CreateCustomPokemonDto) {
    return this.customPokemonService.create(createCustomPokemonDto);
  }

  @Get()
  findAll() {
    return this.customPokemonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customPokemonService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomPokemonDto: UpdateCustomPokemonDto,
  ) {
    return this.customPokemonService.update(+id, updateCustomPokemonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customPokemonService.remove(+id);
  }
}
