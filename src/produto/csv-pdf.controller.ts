import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProdutoService } from './produto.service';
import { xl } from 'excel4node';
import { response } from 'express';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

@Controller('exporta')
@ApiTags('Rota para Download da tabela de produtos em Csv e PDF')
export class CsvPdfController {
    constructor(private readonly produtoService: ProdutoService) {}

  @Get('csv')
  @ApiOperation({summary: 'Converte dados da tabela de produtos para CSV'})
  async produtoCsv(){
    const produtos = await this.produtoService.findAll();

    var wb = new xl.Workbook();
    var ws = wb.addWorksheet('Produtos');

    const body = [];

    for await (let produto of produtos) {
      const rows = new Array();
      rows.push(produto.id);
      rows.push(produto.nome);
      rows.push(produto.tipoQuantidade);
      rows.push(produto.quantidade);
      rows.push(produto.ativo);
      rows.push(produto.categoria_id);
      rows.push(produto.createdAt);
      rows.push(produto.updatedAt);
      rows.push(produto.deletedAt);

      body.push(rows);
    }

    const titulos = [
      "ID",
      "Nome",
      "Unidade",
      "Quantidade",
      "Ativo",
      "Categoria",
      "DataDeCriacao",
      "DataDeAtualizacao",
      "DataDeDelecao",
    ];

    let titulosIndex = 1;
    titulos.forEach(titulo => {
      ws.cell(1, titulosIndex++).string(titulo);
    });

    let rowIndex = 2;
    body.forEach(record => {
      let columnIndex = 1;
      Object.keys(record).forEach(columnName => {
        ws.cell(rowIndex, columnIndex++).string(record[columnName])
      });
      rowIndex++
    });

    await response.end(wb.write('produtos.csv'));
    response.send("Relatório Concluido");

  }

  @Get('pdf')
  @ApiOperation({summary: 'Converte os dados da tabela de produto para PDF'})
  async produtoPdf(){

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
      defaultStyle: { font: 'Times-Roman'},
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
    

    //pdfDoc.pipe(fs.createWriteStream("RelatorioProdutos.pdf"));

    const chunks = [];

    pdfDoc.on("data", (chunk) => {
      chunks.push(chunk);
    });

    pdfDoc.end();

    pdfDoc.on("end", () => {
      const result = Buffer.concat(chunks);
      response.end(result);
    });

    

    response.send("Relatório Concluído");
  }

}
