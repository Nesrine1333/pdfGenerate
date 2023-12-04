import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,SelectQueryBuilder } from 'typeorm';
import { Bl } from './Bl.entity';
import { CreateBlDto } from './DTO/CreateBl.dto';
import { Destinataire } from 'src/destinataires/destinataires.entity';
import { DestinatairesService } from 'src/destinataires/destinataires.service';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/user/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { ColisService } from 'src/colis/colis.service';
import { parse } from 'uuid';
import * as uuid from 'uuid';
import * as crypto from 'crypto';
import { Colis } from 'src/colis/colis.entity';

@Injectable()
export class BlService {
    //private readonly Bl:Bl[] = [];

    // Comunication with databse
    constructor(
        @InjectRepository(Bl)
        private blRepository: Repository<Bl>,
        @InjectRepository(Destinataire) private destinataireRepository: Repository<Destinataire>,
        private destinataireService: DestinatairesService,
        private userService:AuthService,
        @InjectRepository(User)private userRepository:Repository<User>,
        private coliService:ColisService,
        @InjectRepository(Colis)private colisRepository: Repository<Colis>

    ) { }



    uuidv4ToInt(uuidValue: string): number {
        const numericValue = parseInt(crypto.createHash('sha256').update(uuidValue).digest('hex'), 16);
        return numericValue;
      }
 
    // Creation BL
    async create(idColis:number ,idUser:number ,id: number,createBlDto: CreateBlDto) {
        const destinataire = await this.destinataireService.findDestinataireById(id);
        const user= await this.userService.findOneById(idUser);
        const colis= await this.coliService.findOne(idColis);
        
        if (!destinataire) {
            throw new HttpException('Destinataire not found', HttpStatus.BAD_REQUEST);
        }

        const idd=uuidv4()
        const blId = this.uuidv4ToInt(idd); // Generate a unique ID for Bl

        const currentDate = new Date();

        const newBonDeLiv = this.blRepository.create({
          id: blId,
          dateBl: new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate()
          ),
          ...createBlDto,
          destinataire,
          user,
          colis

        });
    
        // Update the Destinataire with the new Bl
        destinataire.bonDeLiv = [...(destinataire.bonDeLiv || []), newBonDeLiv];

        await this.destinataireRepository.save(destinataire);
        return this.blRepository.save(newBonDeLiv);
      }

    // find All BLs
    findAll(): Promise<Bl[]> {
        return this.blRepository.find();
    }

    // find BL by her id
    findOne(id: number): Promise<Bl | null> {
        return this.blRepository.findOneBy({ id });
    }

    // Delete BL
    async remove(id: number): Promise<void> {
        await this.blRepository.delete(id);
    }

    findBLByDest(nom:string): Promise<Bl[]> {
        return  this.blRepository.find({where:{destinataire :{nom : nom}}});
    }

    /*findBlByMonth(date: Date): Promise<Bl[]> {
        const month = date.getMonth() + 1; // Adding 1 because getMonth() returns 0-indexed months
    
        return this.createQueryBuilder('bl')
          .where('MONTH(bl.dateBl) = :month', { month })
          .getMany();
      }*/


    
    /*  async findColisByBlId(id:number): Promise<Colis>{
        const bl =await this.blRepository.findOneBy({id});
        const colisId=await this.colisRepository.findOne(bl.colis)
        return 
      }*/
   
} 
