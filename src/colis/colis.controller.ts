import { Controller, Post, Get, Body, Param, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Colis } from './colis.entity';
import { ColisService } from './colis.service'
import { CreateColiDto } from './DTO/CreateColi.dto';

@Controller('colis')
export class ColisController {
    constructor(private ColisService: ColisService
    ) { }

    //API creation coli
    @Post('createcoli')
    create(@Body() createColiDto: CreateColiDto) {
        return this.ColisService.create(createColiDto);
    }

    //Api findAll colis
    @Get()
    findAll() {
        return this.ColisService.findAll();
    }

    //API find One by id 
    @Get(':id')//te5dem
    findOne(@Param('id') id: number) {
        return this.ColisService.findOne(+id)
    }

    //API Delete Coli by ID
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.ColisService.remove(id)
    }


}
