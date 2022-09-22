import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Produto')
@ApiBearerAuth()
@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @UseGuards(JwtAuthGuard)
  @Post('register')
  @ApiOperation({summary: 'Criação de um novo produto'})
  async create(@Body() createProdutoDto: CreateProdutoDto) {
    return await this.produtoService.create(createProdutoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({summary: 'Busca todos os produtos existentes'})
  findAll() {
    return this.produtoService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({summary: 'Busca um produto existente pelo seu id'})
  findOne(@Param('id') id: number) {
    return this.produtoService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({summary: 'Atualiza alguma informção de um produto existente'})
  update(@Param('id') id: number, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtoService.update(+id, updateProdutoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({summary: 'Deleta um produto'})
  remove(@Param('id') id: number) {
    return this.produtoService.remove(+id);
  }

}
