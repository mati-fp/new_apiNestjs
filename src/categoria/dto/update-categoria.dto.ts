import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateCategoriaDto } from './create-categoria.dto';

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {

    @ApiProperty()
    @IsNotEmpty()
    nome: string;

    @ApiProperty()
    @IsNotEmpty()
    ativo: boolean;
}
