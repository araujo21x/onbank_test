import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CreateCustomPokemonDto } from './dto/create-custom-pokemon.dto';
import { UpdateCustomPokemonDto } from './dto/update-custom-pokemon.dto';
import { getRepository } from 'typeorm';
import CustomPokemon from './custom-pokemon.entity';

@Injectable()
export class CustomPokemonService {
  async create(createCustomPokemonDto: CreateCustomPokemonDto) {
    this.pokemonIsValid(createCustomPokemonDto);

    const newPokemon = await getRepository(CustomPokemon).save(
      this.factoryPokemon(createCustomPokemonDto),
    );

    return newPokemon;
  }

  public async findAll(limit: number, page: number) {
    this.whereIsValid(limit, page);
    const pokemons = await getRepository(CustomPokemon).findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return pokemons;
  }

  public async findOne(id: number) {
    if (isNaN(id))
      throw new HttpException('identificado inválido', HttpStatus.CONFLICT);
    return this.getPokemonById(id);
  }

  public async update(
    id: number,
    updateCustomPokemonDto: UpdateCustomPokemonDto,
  ) {
    this.pokemonEditIsValid(updateCustomPokemonDto, id);
    const pokemon = await this.getPokemonById(Number(id));

    if (!pokemon)
      throw new HttpException('Pokemon não encontrado.', HttpStatus.CONFLICT);

    await getRepository(CustomPokemon).update(id, updateCustomPokemonDto);

    return 'Pokemon editado com sucesso!';
  }

  public async remove(id: number) {
    if (isNaN(id))
      throw new HttpException('identificado inválido', HttpStatus.CONFLICT);

    const { affected } = await getRepository(CustomPokemon).delete(id);
    if (affected === 0)
      throw new HttpException('Erro ao apagar pokemon.', HttpStatus.CONFLICT);

    return `Pokemon deletado com sucesso!`;
  }

  private pokemonIsValid(createCustomPokemonDto: CreateCustomPokemonDto): void {
    this.nameIsValid(createCustomPokemonDto.name);
    this.heightIsValid(createCustomPokemonDto.height);
    this.weightIsValid(createCustomPokemonDto.weight);
  }

  private pokemonEditIsValid(
    updateCustomPokemonDto: UpdateCustomPokemonDto,
    id: number,
  ): void {
    if (isNaN(id))
      throw new HttpException('identificado inválido', HttpStatus.CONFLICT);

    if (updateCustomPokemonDto.name !== undefined)
      this.nameIsValid(updateCustomPokemonDto.name);

    if (updateCustomPokemonDto.height !== undefined)
      this.heightIsValid(updateCustomPokemonDto.height);

    if (updateCustomPokemonDto.weight !== undefined)
      this.weightIsValid(updateCustomPokemonDto.weight);
  }

  private heightIsValid(height: number): void {
    if (isNaN(height))
      throw new HttpException('Altura inválida.', HttpStatus.CONFLICT);
    if (height > 9 || height <= 0)
      throw new HttpException('Altura inválida.', HttpStatus.CONFLICT);
  }

  private weightIsValid(weight: number): void {
    if (isNaN(weight))
      throw new HttpException('Peso inválida.', HttpStatus.CONFLICT);
    if (weight > 999 || weight <= 0)
      throw new HttpException('Peso inválida.', HttpStatus.CONFLICT);
  }

  private nameIsValid(name: string): void {
    if (!name)
      throw new HttpException('Nome é obrigatório', HttpStatus.CONFLICT);
    if (name.length < 3)
      throw new HttpException('Nome inválido', HttpStatus.CONFLICT);
  }

  private factoryPokemon(
    createCustomPokemonDto: CreateCustomPokemonDto,
  ): CustomPokemon {
    const customPokemon: CustomPokemon = new CustomPokemon();
    customPokemon.name = createCustomPokemonDto.name;
    customPokemon.height = createCustomPokemonDto.height;
    customPokemon.weight = createCustomPokemonDto.weight;
    return customPokemon;
  }

  private async getPokemonById(id: number): Promise<CustomPokemon | undefined> {
    return await getRepository(CustomPokemon).findOne({
      where: { idCustomPokemon: id },
    });
  }

  private whereIsValid(limit: number, page: number): void {
    this.limitIsValid(limit);
    this.pageIsValid(page);
  }

  private limitIsValid(limit: number): void {
    if (!limit)
      throw new HttpException(
        'Limite de paginação é obrigatório.',
        HttpStatus.CONFLICT,
      );
    if (isNaN(limit))
      throw new HttpException(
        'Limite de paginação inválido.',
        HttpStatus.CONFLICT,
      );
  }

  private pageIsValid(page: number): void {
    if (!page)
      throw new HttpException('Pagina é obrigatória.', HttpStatus.CONFLICT);
    if (isNaN(page))
      throw new HttpException('Pagina inválida.', HttpStatus.CONFLICT);
  }
}
