import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProdutoDto {

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
