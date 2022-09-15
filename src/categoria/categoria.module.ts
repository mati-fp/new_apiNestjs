import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { Categoria } from './entities/categoria.entity';
import { Produto } from 'src/produto/entities/produto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria, Produto]), Produto],
  controllers: [CategoriaController],
  providers: [CategoriaService],
  exports: [CategoriaService, TypeOrmModule]
})
export class CategoriaModule {}
