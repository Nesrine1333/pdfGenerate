import { Injectable } from '@nestjs/common';
import { Colis } from './colis.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateColiDto } from './DTO/CreateColi.dto';
import { v4 as uuidv4 } from 'uuid';
import { parse } from 'uuid';
import * as uuid from 'uuid';
import * as crypto from 'crypto';


@Injectable()
export class ColisService {
    //private readonly Colis:Colis[] = [];
    // Comunication with databse
        constructor(
        @InjectRepository(Colis)
        private colisRepository: Repository<Colis>,
    ) { }



    

     uuidv4ToInt(uuidValue) {
        // Remove dashes and convert to lowercase
        //const hexString = uuidValue.replace(/-/g, '').toLowerCase();
      
        // Use parseInt with base 16 to convert hex to decimal
        //const uuidAsInt = parseInt(hexString, 16);
        const parsedUuid = parse(uuidValue);
        const numericValue = parseInt(crypto.createHash('md5').update(uuidValue).digest('hex'), 16);

        return numericValue;
      }

    generateRandomNumber(min: number, max: number): number {
        // Generate a random number between min (inclusive) and max (exclusive)
        return Math.floor(Math.random() * (max - min) + min);
      }
      
      
      // Example usage:
     ref = (this.generateRandomNumber(1, 100)).toString();
    //Creation Coli
    async create(createColiDto: CreateColiDto) {
        const currentDate = new Date();
        const idd=uuidv4()
        const newColis= this.colisRepository.create({
            id:this.uuidv4ToInt(idd),
            dateBl: new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate()
              ),
            reference:this.ref,
            ...createColiDto});
        const colis= await this.colisRepository.save(newColis);
       
        const idv=colis.id
        return (idv) ;
    }

    // find All Colis
    findAll(): Promise<Colis[]> {
        return this.colisRepository.find();
    }

    // find Coli by his id
    findOne(id: number): Promise<Colis | null> {
        return this.colisRepository.findOneBy({ id });
    }

    // Delete Colis
    async remove(id: number): Promise<void> {
        await this.colisRepository.delete(id);
    }

}
