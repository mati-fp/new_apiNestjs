import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateProdutoDto } from './create-produto.dto';

export class UpdateProdutoDto extends PartialType(CreateProdutoDto) {

    @ApiProperty()
    @IsNotEmpty()
    nome: string;

    @ApiProperty()
    @IsNotEmpty()
    tipoQuantidade: string;

    @ApiProperty()
    @IsNotEmpty()
    quantidade: number;

    @ApiProperty()
    @IsNotEmpty()
    ativo: boolean;

    @ApiProperty()
    @IsNotEmpty()
    categoria_id: number;
}
