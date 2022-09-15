import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import PdfPrinter, {  } from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import xl from 'excel4node';
import { response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Produto')
@ApiBearerAuth()
@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @UseGuards(JwtAuthGuard)
  @Post('register')
  async create(@Body() createProdutoDto: CreateProdutoDto) {
    return await this.produtoService.create(createProdutoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.produtoService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.produtoService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtoService.update(+id, updateProdutoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.produtoService.remove(+id);
  }

  @Get('csv')
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
