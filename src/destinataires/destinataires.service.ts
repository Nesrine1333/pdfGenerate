import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import {Repository} from'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { createDestinatairedto } from './Dto/createdestinataire.dto';
import { Destinataire } from './destinataires.entity';
import { v4 as uuidv4 } from 'uuid';
import { parse } from 'uuid';
import * as uuid from 'uuid';
import * as crypto from 'crypto';


@Injectable()
export class DestinatairesService {
    constructor(@InjectRepository(Destinataire) private destinataireRepositpry: Repository<Destinataire>){}


    async findDestinataireById(id:number){
        const destinataire= await this.destinataireRepositpry.findOneBy({ id });
        if(!destinataire)
          throw new HttpException(
            'User not found',HttpStatus.BAD_REQUEST
          )
          return  destinataire;
        
    }

    findAllDestinataire(){
     return this.destinataireRepositpry.find();
    }


    uuidv4ToInt(uuidValue: string): number {
      const numericValue = parseInt(crypto.createHash('sha256').update(uuidValue).digest('hex'), 16);
      return numericValue;
    }
  

    async createDestinataire(createDistinataire: createDestinatairedto) {
      const idd=uuidv4()
        const newDestin = this.destinataireRepositpry.create({
  
          ...createDistinataire
        });
      
        const dest= await this.destinataireRepositpry.save(newDestin);
         return dest.id;
      }


}
