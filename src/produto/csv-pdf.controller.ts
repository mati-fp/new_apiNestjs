import { Controller, Get, StreamableFile } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProdutoService } from './produto.service';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
const createCsvWriter = require('csv-writer').createArrayCsvWriter;
var PdfPrinter = require('pdfmake');
import * as fs from 'fs'
import { join } from 'path';
import pdfmake from 'pdfmake'



@Controller('exporta')
@ApiTags('Rota para Download da tabela de produtos em Csv e PDF')
export class CsvPdfController {
    constructor(private readonly produtoService: ProdutoService) {}

  @Get('csv')
  @ApiOperation({summary: 'Converte dados da tabela de produtos para CSV'})
  async newProdutosCsv(/*@Res() res: Response*/): Promise<StreamableFile>{
    
    const produtos = await this.produtoService.findAll();
    
    const csvWriter = createCsvWriter({
      path: './produtos.csv',
      header: [
          'id',
          'nome',
          'Tipo Quantidade',
          'Quantidade',
          'Ativo',
          'Categoria Id'
      ]
  });

    var body = [];

    for await (let produto of produtos) {
      const rows = new Array();
      rows.push(produto.id);
      rows.push(produto.nome);
      rows.push(produto.tipoQuantidade);
      rows.push(produto.quantidade);
      rows.push(produto.ativo);
      rows.push(produto.categoria_id);

      body.push(rows);
      
    }

    csvWriter.writeRecords(body)       // returns a promise
    .then(() => {
        console.log('...Done');
    });

    const readStream =fs.createReadStream(join(process.cwd(), './produtos.csv'))

    return new StreamableFile(readStream);
    
  }



  @Get('pdf')
  @ApiOperation({summary: 'Converte os dados da tabela de produto para PDF'})
  async produtoPdf(): Promise<StreamableFile>
  {

    const produtos = await this.produtoService.findAll();

    const fonts = {
      Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
      },
      Times: {
        normal: 'Times-Roman',
        bold: 'Times-Bold',
        italics: 'Times-Italic',
        bolditalics: 'Times-BoldItalic'
      },
    };

    const printer = new PdfPrinter(fonts);

    const body = [];

    for await (let produto of produtos) {
      const rows = new Array();
      rows.push(produto.id);
      rows.push(produto.nome);
      rows.push(produto.tipoQuantidade);
      rows.push(produto.quantidade);
      rows.push(produto.ativo);
      rows.push(produto.categoria_id);

      body.push(rows);
    }

    const docDefinitions: TDocumentDefinitions = {
      defaultStyle: { font: 'Helvetica'},
      content: [
        {
          columns: [
            {text: "Relatório de Produtos", style: "header" },
            {text: "Mateus F.P.\n\n", style: "header" },
          ]
        },
        {
          table: {
            heights: function (row) {
              return 20;
            },
            widths: [50, 'auto', 'auto', 'auto', 'auto', 'auto',],
            body: [
              [{text: 'ID', style: 'columnsTitle'},
               {text: 'nome', style: 'columnsTitle'},
               {text: 'Unidade', style: 'columnsTitle'},
               {text: 'Quantidade', style: 'columnsTitle'},
               {text: 'Ativo', style: 'columnsTitle'},
               {text: 'Categoria', style: 'columnsTitle'},
              ], ...body
            ],
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: "justify",
        },
        columnsTitle: {
          fontSize: 13,
          bold: true,
          fillColor: "#11c7",
          color: '#FFF',
          alignment: "center",
          margin: 4,
        }
      }
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinitions);
    

    pdfDoc.pipe(fs.createWriteStream("RelatorioProdutos.pdf"));

    const chunks = [];

    pdfDoc.on("data", (chunk) => {
      chunks.push(chunk);
    });

    pdfDoc.end();

    let result
    pdfDoc.on("end", () => {
      result = Buffer.concat(chunks);
      
    });

    const readStream =fs.createReadStream(join(process.cwd(), './RelatorioProdutos.pdf'))

    return new StreamableFile(readStream);

  }

}
