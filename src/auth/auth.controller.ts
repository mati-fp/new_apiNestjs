import { Controller, Get, Post, Body} from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiProperty()
  @Post('login')
  async login(@Body() body:any) {
    return await this.authService.login(body);
  }

}
