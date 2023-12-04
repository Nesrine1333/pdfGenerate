import { Injectable,Res } from '@nestjs/common';
import { Workbook } from 'exceljs';
import * as ExcelJS from 'exceljs';
import { Response } from 'express';



@Injectable()
export class ExelfileService {
     
      async ExcelFile(): Promise<string> {
    
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('EXEL');
    
        // Add headers
        worksheet.addRow(['external_ref', 'nom_prenom', 'tel2','echange', 'adresse', 'governorate','cr_bt','description']);

        // Save the workbook to a file
        const filePath = `exel_data.xlsx${Date.now()}.xlsx`;
        await workbook.xlsx.writeFile(filePath);
    
        return filePath;
      }

//creation exel file
      async downloadExelSheet(){
        let rows=[]
         //creation workbook
         let book = new Workbook();
         // add a woorksheet to workbook
         let sheet = book.addWorksheet('sheet1')
         // add the header
         rows.unshift((Object))
         //add multiple rows
         sheet.addRows(rows)

      
    }

}
