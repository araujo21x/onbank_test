import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { getRepository } from 'typeorm';
import User from './user.entity';

@Injectable()
export class UserService {
  public async create(createUserDto: CreateUserDto) {
    this.userIsValid(createUserDto);

    const user = await this.getByEmail(createUserDto.email);
    if (user)
      throw new HttpException('E-mail já cadastrado', HttpStatus.CONFLICT);

    await getRepository(User).save(this.factoryUser(createUserDto));
    return 'Usuário Cadastrado!';
  }

  public async getByEmail(email: string): Promise<User | undefined> {
    return await getRepository(User).findOne({ where: { email } });
  }

  private userIsValid(createUserDto: CreateUserDto): void {
    this.emailIsValid(createUserDto.email);
    this.passwordIsValid(createUserDto.password);
  }

  private emailIsValid(email: string): void {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email)
      throw new HttpException('E-mail é obrigatório', HttpStatus.CONFLICT);
    if (!regex.test(email))
      throw new HttpException('E-mail inválido', HttpStatus.CONFLICT);
  }

  private passwordIsValid(password: string): void {
    if (!password)
      throw new HttpException('Senha é obrigatória', HttpStatus.CONFLICT);
    if (typeof password !== 'string')
      throw new HttpException('Senha inválida', HttpStatus.CONFLICT);
    if (password.length < 6)
      throw new HttpException('Senha inválida', HttpStatus.CONFLICT);
  }

  private factoryUser(createUserDto: CreateUserDto): User {
    const user: User = new User();
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    return user;
  }
}
