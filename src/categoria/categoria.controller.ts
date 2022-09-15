import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@ApiTags('Categoria')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post('register')
  @ApiOperation({summary: 'Criação de uma nova categoria'})
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriaService.create(createCategoriaDto);
  }

  @Get()
  @ApiOperation({summary: 'Busca todas as categorias'})
  findAll() {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Busca se existe a categoria pelo seu id'})
  findOne(@Param('id') id: number) {
    return this.categoriaService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Atualiza algum dado referente uma categoria existente'})
  update(@Param('id') id: number, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriaService.update(+id, updateCategoriaDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Deleta a categoria'})
  remove(@Param('id') id: number) {
    return this.categoriaService.remove(+id);
  }
}
