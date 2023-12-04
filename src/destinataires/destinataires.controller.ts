import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DestinatairesService } from './destinataires.service';
import { createDestinatairedto } from './Dto/createdestinataire.dto';


@Controller('destinataires')
export class DestinatairesController {

    constructor(private destinatiareService: DestinatairesService){}

    @Get('/getAllDest')
    async getAllDestinataires(){
        const destinataires= await this.destinatiareService.findAllDestinataire();
        return destinataires;
    }


    @Post('/createDest')
    createDestinataire(@Body() createDestinatairedto:createDestinatairedto ){
       return this.destinatiareService.createDestinataire( createDestinatairedto);
    }

    @Get(':id/getDestinataire')
    async getOneDestinataire (@Param('id') id : number) {
        return this.destinatiareService.findDestinataireById(id);
    }

    
}
