import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CustomPokemonService } from './custom-pokemon.service';
import { CreateCustomPokemonDto } from './dto/create-custom-pokemon.dto';
import { UpdateCustomPokemonDto } from './dto/update-custom-pokemon.dto';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';

@Controller('custom-pokemon')
export class CustomPokemonController {
  constructor(private readonly customPokemonService: CustomPokemonService) {}

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateCustomPokemonDto: UpdateCustomPokemonDto,
  ) {
    return this.customPokemonService.update(id, updateCustomPokemonDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.customPokemonService.remove(+id);
  }
}
