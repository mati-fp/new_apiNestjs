import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';

@Injectable()
export class ProdutoService {
  constructor(@InjectRepository(Produto) private readonly produtoRepository: Repository<Produto>) {}

  async create(createProdutoDto: CreateProdutoDto) {
    const produto = await this.produtoRepository.create(createProdutoDto);
    return await this.produtoRepository.save(produto);
  }

  async findAll() {
    return await this.produtoRepository.find({select: ['id', 'nome', 'tipoQuantidade', 'quantidade', 'ativo', 'categoria_id']});
  }

  async findOne(id: number) {
    try {
      return await this.produtoRepository.findOneOrFail({where: {id}});
    } catch (error){
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    const produto = await this.produtoRepository.findOneOrFail({where: {id}});
    this.produtoRepository.merge(produto, updateProdutoDto);
    return await this.produtoRepository.save(produto);
  }

  async remove(id: number) {
    await this.produtoRepository.findOneOrFail({where: {id}});
    this.produtoRepository.softDelete({id});
  }
}
