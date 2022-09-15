import { Controller, Get, Post, Body, Param} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { json } from 'express';
import { AuthService } from './auth.service';
import { LogInDto } from './login.dto';


@Controller('auth')
@ApiTags('.Login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Faz o Log In'})
  @ApiBody({type: LogInDto})
  async login(@Body() body:any) {
    return await this.authService.login(body);
  }

}
