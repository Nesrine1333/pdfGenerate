import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as exceljs from 'exceljs';
import { Destinataire } from 'src/destinataires/destinataires.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadGroupeService {

    constructor(@InjectRepository(Destinataire) private destinataireRepositpry: Repository<Destinataire>){}
    
    //you don't need the function keywrd when using a function in a service 
    async readExcel(filePath: string) {
        const workbook = new exceljs.Workbook();
        await workbook.xlsx.readFile(filePath);
      
        // Access worksheets and extract data
        const worksheet = workbook.getWorksheet(1);
        const data = worksheet.getSheetValues();
      
        return data;
      }

      async saveDataFromExcel(data: any[]) {

        const generatedIds = data.slice(1).map(() => uuidv4());

    // Map Excel data to your entity model, starting from the second row
        const mappedData = data.slice(2).map((row, index) => ({
            id: generatedIds[index],
            nom: row[1],
            numTelephone: row[2],
            address: row[3],
            gov: row[4],
            delegation: row[5],
            // ...
        }));
    
        // Save to the database
        await this.destinataireRepositpry.save(mappedData);
      }
}
