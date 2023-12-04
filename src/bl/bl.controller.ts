import { Controller, Post, Get, Body, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { BlService } from './bl.service';
import { CreateBlDto } from './DTO/CreateBl.dto';
import { Bl } from './Bl.entity';

@Controller('bl')
export class BlController {
    constructor(private BlService: BlService
    ) { }

    //API creation BL
    @Post(':idUser/:idColis/:id/createbl')
    create(@Param('idColis',ParseIntPipe)isColis:number ,@Param('idUser',ParseIntPipe)idUser:number,@Param('id',ParseIntPipe) id:number,@Body() createBlDto: CreateBlDto) {
        return this.BlService.create(isColis,idUser,id,createBlDto);
    }

    //Api findAll BLs
    @Get()
    findAll() {
        return this.BlService.findAll();
    }

    //API find BL by id 
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.BlService.findOne(+id)
    }

    //API Delete BL by ID
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.BlService.remove(id)
    }


    //getBdlbydestinataireName

 /*   @Get(':id/colis')
    findColidByBlId(@Param('id') id: number){
     return this.BlService.findColisByBlId(id);
    }*/

    


}
