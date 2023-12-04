import { Bl } from "src/bl/Bl.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : 'Destinataires'})
export class Destinataire{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column()
    numTelephone:number;

    @Column()
    address:String;

    @Column()
    gov:string;

    @Column()
    delegation:string;


    @OneToMany(()=> Bl, (bonDeLiv)=>bonDeLiv.destinataire)
    bonDeLiv:Bl[];

}