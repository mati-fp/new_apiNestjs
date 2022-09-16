import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import { Produto } from './entities/produto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CsvPdfController } from './csv-pdf.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Produto, Categoria]), Categoria],
  controllers: [ProdutoController, CsvPdfController],
  providers: [ProdutoService],
  exports: [ProdutoService, TypeOrmModule],
})
export class ProdutoModule {}
