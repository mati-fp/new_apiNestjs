import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

//essa classe é usada somente para poder passar parâmetros na rota de login do swagger
export class LogInDto {

    @ApiProperty()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;
}