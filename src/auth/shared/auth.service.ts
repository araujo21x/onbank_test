import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import User from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userEmail: string, userPassword: string) {
    const user: User = await this.userService.getByEmail(userEmail);

    if (user && bcrypt.compareSync(userPassword, user.password)) {
      const { idUser, email } = user;
      return { idUser, email };
    }
  }

  async login(user: any) {
    const payload = { sub: user.idUser };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
