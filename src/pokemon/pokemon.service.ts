import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class PokemonService {
  private url: string;
  constructor(private http: HttpService) {
    this.url = 'https://pokeapi.co/api/v2/pokemon';
  }

  public async findAll(limit: number, page: number) {
    this.whereIsValid(limit, page);

    const {
      data: { count, results },
    } = await this.http
      .get(`${this.url}`, {
        params: { offset: (page - 1) * limit, limit },
      })
      .toPromise();

    return { count, pokemons: results };
  }

  public async findOne(id: number) {
    if (isNaN(id))
      throw new HttpException('identificado inválido', HttpStatus.CONFLICT);
    const { data } = await this.http.get(`${this.url}/${id}`).toPromise();
    return data;
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
