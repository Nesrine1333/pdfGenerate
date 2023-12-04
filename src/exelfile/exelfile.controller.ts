import { Controller,Get,Res,Header } from '@nestjs/common';
import { ExelfileService } from './exelfile.service';
import { Response } from 'express';
import * as fs from 'fs';

@Controller('exelfile')
export class ExelfileController {

    constructor(private readonly exelfileService: ExelfileService) { }

  // API Export Exel File : http://localhost:3333/exelfile/download
  //<a href="http://localhost:3333/exelfile/download" target="_blank"> // pour faire le download de fichier exel
  @Get('download')
  @Header('Content-Type', 'text/xlsx')
  async generateExcelFile(@Res() res: Response)//: Promise<void> 
  {
    const filePath = await this.exelfileService.ExcelFile();

    res.download(filePath, 'exel_data.xlsx', (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).send('Error downloading file');
        res.download('$(filePath)');
    
      }});
}

}