import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CategoriaModule } from './categoria/categoria.module';
import { ProdutoModule } from './produto/produto.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { Produto } from './produto/entities/produto.entity';
import { Categoria } from './categoria/entities/categoria.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: configService.get('TYPEORM_CONNECTION') as any,
          host: configService.get('TYPEORM_HOST') as any,
          port: configService.get('TYPEORM_PORT') as any,
          username: configService.get('TYPEORM_USERNAME') as any,
          password: configService.get('TYPEORM_PASSWORD') as any,
          database: configService.get('TYPEORM_DATABASE') as any,
          entities: [User, Produto, Categoria],
          logging: true,
          cli: {
            migrationsDir: configService.get('TYPEORM_MIGRATIONS_DIR') as any,
          }
        }
      }
    }),
    UserModule,
    CategoriaModule,
    ProdutoModule,
    AuthModule,
    MulterModule.register({dest: './uploads'})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// 'dist/**/*.entity{.ts,.js}'