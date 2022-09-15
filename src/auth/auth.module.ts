import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [ConfigModule.forRoot() ,UserModule, PassportModule, JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {expiresIn: '1000s'},
  })],
providers: [AuthService, JwtStrategy],
controllers: [AuthController],
exports: [AuthService]
})
export class AuthModule {}

