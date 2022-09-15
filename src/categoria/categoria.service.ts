import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(@InjectRepository(Categoria) private readonly categoriaRepository: Repository<Categoria>) {}
  
  async create(createCategoriaDto: CreateCategoriaDto) {
    const categoria = await this.categoriaRepository.create(createCategoriaDto);
    return await this.categoriaRepository.save(categoria);
  }

  async findAll() {
    return await this.categoriaRepository.find({select: ['id', 'nome', 'ativo']});
  }

  async findOne(id: number) {
    try {
      return await this.categoriaRepository.findOneOrFail({where: {id}});
    } catch (error){
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    const categoria = await this.categoriaRepository.findOneOrFail({where: {id}});
    this.categoriaRepository.merge(categoria, updateCategoriaDto);
    await this.categoriaRepository.save(categoria);
  }

  async remove(id: number) {
    await this.categoriaRepository.findOneOrFail({where: {id}});
    this.categoriaRepository.softDelete({id});
    return 'Usuário deletado com sucesso;'
  }
}
