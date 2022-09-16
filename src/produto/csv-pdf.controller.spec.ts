import { Test, TestingModule } from '@nestjs/testing';
import { CsvPdfController } from './csv-pdf.controller';

describe('CsvPdfController', () => {
  let controller: CsvPdfController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CsvPdfController],
    }).compile();

    controller = module.get<CsvPdfController>(CsvPdfController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
