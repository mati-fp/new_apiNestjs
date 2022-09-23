import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('Rota do Hello meu cumpadre')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('file')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './files',
      filename: (req, file, callback) => {
        const uniquePreffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const filename = `${uniquePreffix}-${file.originalname}`;
        callback(null, filename);
      },
    })
  }))
  handleUpload(@UploadedFile() file: Express.Multer.File){
    console.log('file', file)
    return 'Upload de documentos';
  }
}
