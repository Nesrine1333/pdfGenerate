import { Controller, Post, Get, Body, Param, Delete, UploadedFiles, UseInterceptors, Res } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';
//import path from 'path';
import { Observable, of } from 'rxjs';
import { join } from 'path';
import { response } from 'express';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { PdfdownloadService } from './pdfdowload.service';
import * as PDFDocument from 'pdfkit';
import { DestinatairesService } from 'src/destinataires/destinataires.service';
import { AuthService } from 'src/auth/auth.service';
import { ColisService } from 'src/colis/colis.service';

//import { table, tableCell, tableRow } from 'pdfkit-table';


// downloadfile path / name / extention
export const Storage = {
    storage: diskStorage({
        destination: './downloads/',
        filename: async (req, file, cb) => {
                try {
                  console.log('file:', file);
                  if (file && file.originalname && typeof file.originalname === 'string' ) {
                    const filename: string = path.parse(file.originalname).name.replace(/\s/g, '');
                    const extention: string = path.parse(file.originalname).ext;
                    console.log('filename:', filename);
                    console.log('extention:', extention);
                    cb(null, `${filename}${extention}`);
                  } else {
                    console.error("Le fichier est indéfini ou n'a pas de propriété 'originalname'.");
                    cb(null, null);
                  }
                } catch (error) {
                  console.error("Une erreur est survenue lors de la génération du nom de fichier:", error);
                  cb(error, null);
                }
              }             
    })
}

@Controller('pdf')
export class PdfdownloadController {
    constructor(private readonly pdfdownloadService: PdfdownloadService,
        private destinatiareService: DestinatairesService,
        private readonly authService: AuthService,
        private ColisService: ColisService
        ) { }

    //Upload file PDF , APi : http://localhost:3000/pdf/post
    @Post('/post')
    @UseInterceptors(AnyFilesInterceptor(Storage))
    async UploadMultiplesFiles(@UploadedFiles() files, @Body() Body) {
        console.log(Body.adicionals);
        //return(response: true);
        console.log("testpostfile valide");
        return (true);
    }

    //Api GET PDF FILES : http://localhost:3000/pdf/downloads
    @Get('downloads')
    async downloadPDF(@Res() res): Promise<void> {
        const buffer = await this.pdfdownloadService.generatePDF();

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=example.pdf',
            'Content-Length': buffer.length,
        })
        console.log("testdowload,tester valide")
        res.end(buffer);
    }

    //Api GetFile : http://localhost:3000/pdf/filename
    @Get(':filename')
    downloadFile(@Param('filename') __filename, @Res() res): Observable<Object> {
        return of(res.sendFile(join(process.cwd(), 'downloads/', __filename)))
    }


    @Post(':idDest/:idUser/:idColis')
    async generatePdf(@Param('idDest') idDest: number,@Param('idUser') idUser: number,@Param('idColis') idColis: number, @Res() res: Response) {
        try {
        const destinataire = await this.destinatiareService.findDestinataireById(idDest);
        const user = await this.authService.findOneById(idUser);
        const colis= await this.ColisService.findOne(idColis);
      


        const fs = require("fs");
        const PDFDocument = require("pdfkit-table");
        const pdfDoc =new PDFDocument({ margin: 30, size: 'A4', });


        const leftColumnX = 50;
        const columnGap = 50;  // Adjust the gap between columns
        const rightColumnX = leftColumnX + columnGap;  // Calculate the X-coordinate for the right column
        const textOptions = {font:'Times-Roman',fontSize: 12};

        const image =user.logo;
        const x = 50;
        const y = 150;

        const imagePath = path.join(__dirname, '..', '..', 'uploads',  image);
        

        const xUpperRight = pdfDoc.page.width - 120; // Adjust as needed
        const yUpperRight = 10; // Adjust as needed
        
        // Coordinates for the center
        const xCenter = pdfDoc.page.width / 2;
        const yCenter = pdfDoc.y;
        
        pdfDoc
          
          .text(`Bon de Livraison No: ${colis.reference}`, { align: 'center', ...textOptions })
          .text(`Date d'enlévement:${colis.dateBl}`, { align: 'center',continued:true, ...textOptions })
          .image(imagePath, xUpperRight, yUpperRight, { width: 100 })
          .text(' ',{align:'center'})
          .moveDown();


     

        

        // Information Destinataire
        
    


        // Information Expediteur
        pdfDoc.fontSize(10)
        .text(' ',{align:'center'})
        .text(' ',{align:'center'})
        .text(`Information Expediteur`, {continued:true })
        .text(`Information Destinateur`,{align:'right' })
        .text(`Nom:${user.nom}`, {continued:true, align: 'left' })
        .text(`Nom:${destinataire.nom}`,{align:'right' })
        .text(`MF:${user.matriculeFiscale}`, {continued:true, align: 'left'} )  
        .text(`Tel:${destinataire.numTelephone}`,{align:'right' })
        .text(`Adress:${user.adress}`, {continued:true, align: 'left' })  
        .text(`Address:${destinataire.address}`,{align:'right' })
        .text(`Gouvernorat:${user.gover}` ,{continued:true, align: 'left' })
        .text('',{align:'left'})
        .moveDown()
        
        
        
        
              
        
        // Référence transportaur
        pdfDoc
        .text(' ',{align:'left'})
        .text('Référence transporteur', { align: 'left', ...textOptions })
        .moveDown();


        // Now add content to the right colum

        const desc=colis.desc.toString();

        const prix=colis.prixHliv.toString();

        const Livraison=colis.prixLiv.toString();

        const quantite=1 //colis.quantite.toString();

        const montant=(colis.prixHliv*quantite).toString();

        const prixTot=(colis.prixHliv*quantite+colis.prixLiv).toString();

          // requires 
        const table = {
           title: "Details",
           headers: [
            { label: "Description",headerColor:"#1765d1", headerOpacity:1  },
            { label: "Prix" ,headerColor:"#1765d1", headerOpacity:1},
            { label: "Quantité",headerColor:"#1765d1", headerOpacity:1 },
            { label: "Montant",headerColor:"#1765d1", headerOpacity:1 },
          ],
           rows: [
             [desc, prix, "1",montant],
             ["Livraison", "", "",Livraison],
             ["Total", "", "",prixTot],
          ],
         };
         pdfDoc.table( table, { 
         //   A4 595.28 x 841.89 (portrait) (about width sizes)
         //  width: 300,
            columnsSize: [ 300, 100, 70,70 ],
            prepareHeader: () => pdfDoc.fontSize(10)
            .fill('black'),
            prepareRow: (row, indexColumn, indexRow, rectRow) => {
              pdfDoc.font("Helvetica").fontSize(8);
              indexColumn === 0 && pdfDoc.addBackground(rectRow, 'grey', 0.15);
            },
         }); 

         pdfDoc.fontSize(7)  
          .text(`Total Piéces= numero`, { align: 'left',
          })
          .moveDown();
        

          const width = pdfDoc.widthOfString('Dates pervisionelles');
          const height = pdfDoc.currentLineHeight(0);
          pdfDoc.fontSize(12)
          .font('Helvetica-Bold')
          .underline(20, 0, width, height)
          .text(`Dates pervisionelles`, { align: 'left'}) // Set font size to 16
            .moveDown();

          pdfDoc.fontSize(9)
          .font('Helvetica')
            .text(`Date date a partir de date`, { align: 'left'}) // Set font size to 14
            .text(' ', { align: 'left' })
            .moveDown();

          pdfDoc.fontSize(9)
          .font('Helvetica')
          .text(`Bon de Livraison No: ${colis.quantite}`, { align: 'center'}) // Set font size to 18
            .moveDown();

          pdfDoc.fontSize(9)
          .font('Helvetica')
          .text('Transporteur', { align: 'left', continued: true }) // Set font size to 12
            .text('Date d"enlévement: Date', { align: 'right' })
            .text('Téléphone', { align: 'left', continued: true }) // Set font size to 12
            .text('codeQR', { align: 'right'  })
            .moveDown();

         pdfDoc.lineWidth(2);
         //position
         const recyPosition = (pdfDoc.page.height/2)+40;//3aml 3al y =tul el page
         
         //Mesures 
         const widthShape=pdfDoc.page.width-40//3uredh
         const length=pdfDoc.page.height/7//tul


         const xWidth=pdfDoc.page.width
         const line=pdfDoc.page.width/2
         const yline=length+460

         //y el ktiba

         const text2 = [
          `Nom:${user.nom}`,
          `MF:${user.matriculeFiscale}`,
          `Adress:${user.gover}`,
          `Gouvernorat:${user.gover}`
        ];
        
        const text3 = [
          `Nom:${destinataire.nom}`,
          `Tel:${destinataire.numTelephone}`,
          `Address:${destinataire.address}`
        ];
        
        const textTitle2 = 'Information Expediteur';
        const textTitle3 = 'Information Destinateur';
        
        const text = `${textTitle2}\n${text2.join('\n')}\n\n${textTitle3}\n${text3.join('\n')}`;
        
        pdfDoc.y = recyPosition + 10;
        
        pdfDoc
          .fontSize(12)
          .font('Helvetica-Bold')
          .text(textTitle2, { align: 'left', continued: true })
          .text('                                                     ', {continued: true})
          .text(textTitle3, { align: 'justify' });
        pdfDoc
          .fontSize(12)
          .font('Helvetica')
          .text(text, {
            x: 30,
            columns: 2,
            columnGap: 80,
            height: 85,
            align: 'justify'
          });
        
     
       
      pdfDoc
      .moveTo(line, recyPosition)
      .lineTo(line, yline)
      .lineJoin('round')
      .roundedRect(20, recyPosition, widthShape, length, 15)
      .stroke()
      .moveDown();

      pdfDoc.y = recyPosition+length+20;
    
      const montant2=((colis.prixHliv*quantite)+colis.prixLiv).toString();

      const tva=((colis.prixHliv*quantite)+colis.prixLiv)*0.19;


      const ttc=((colis.prixHliv*quantite)+colis.prixLiv+tva).toString();

      

      const table2 = {
        title: "Details",
        headers: [
         { label: "Description",headerColor:"#1765d1", headerOpacity:1  },
         { label: "Montant",headerColor:"#1765d1", headerOpacity:1 },
       ],
        rows: [
          [desc,montant2],
          ["TVA(19%)",tva],
          ["Total Montant TTC",ttc],
       ],
      };
      pdfDoc.table( table2, { 
      //   A4 595.28 x 841.89 (portrait) (about width sizes)
      //  width: 300,
         columnsSize: [ 440, 100 ],
         prepareHeader: () => pdfDoc.fontSize(10)
         .fill('black'),
         prepareRow: (row, indexColumn, indexRow, rectRow) => {
           pdfDoc.fontSize(10).font("Helvetica");
           indexColumn === 0 && pdfDoc.addBackground(rectRow, 'grey', 0.15);
         },
        
      }); 

        //pdfDoc.text(`Destinataire Data:\n${JSON.stringify(destinataire)}`);

        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');



        

        const formattedDateTime = `${year}-${month}-${day}_${hours}-${minutes}`;
         // Format date as 'YYYY-MM-DD'
    
        // Set headers for PDF download
        const dirPath = path.resolve(process.cwd(), 'downloads');
        console.log('Directory path:', dirPath);
  
        if (!fs.existsSync(dirPath)) {
          console.log('Creating directory: downloads');
          fs.mkdirSync(dirPath, { recursive: true });
        }
  
        const filePath = path.resolve(dirPath,  formattedDateTime);
        console.log('File path:', filePath);
  
        await new Promise<void>((resolve, reject) => {
          pdfDoc.pipe(fs.createWriteStream(filePath))
            .on('finish', () => {
              console.log('File writing finished');
              resolve();
            })
            .on('error', (error) => {
              console.error('File writing error:', error);
              reject(error);
            });
  
          pdfDoc.end();
        });
  
        console.log(`File path: ${filePath}`);
  
        res.header('Content-Type', 'application/pdf');
        res.header('Content-Disposition', `attachment; filename=${formattedDateTime}`);
        res.sendFile(filePath);
      } catch (error) {
        console.error(error);
        res.status(404).json({ message: 'Destinataire not found' });
    }
  }
}