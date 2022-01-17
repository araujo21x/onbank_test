import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
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
  findAll(@Query('limit') limit: number, @Query('page') page: number) {
    return this.customPokemonService.findAll(Number(limit), Number(page));
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.customPokemonService.findOne(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateCustomPokemonDto: UpdateCustomPokemonDto,
  ) {
    return this.customPokemonService.update(id, updateCustomPokemonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.customPokemonService.remove(+id);
  }
}
