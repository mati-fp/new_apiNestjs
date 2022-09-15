import { Controller, Get, Post, Body} from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';


@Controller('auth')
@ApiTags('.Login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('login')
  async login(@Body() body:any) {
    return await this.authService.login(body);
  }

}
