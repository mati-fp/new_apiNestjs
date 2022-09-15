import { Injectable } from '@nestjs/common';
import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { compareSync } from "bcrypt";
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService){}

    async login(user: { email: string; password: any; }){

      let usuario: User;
      try {
        usuario = await this.userService.findOneEmail(user.email);
      } catch (error){
        return 'Email não cadastrado';
      }

      const isPasswordValid =  await compareSync(user.password, usuario.password);
      if(!isPasswordValid) return 'Senha inválida';

      const payload ={ sub: usuario.id, email: usuario.email }
      
      return {
        token: this.jwtService.sign(payload),
      }
    }
}
