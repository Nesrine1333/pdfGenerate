// colis.entity.ts
import { Bl } from 'src/bl/Bl.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({name: 'colis'})
export class Colis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  desc: string;

  @Column()
  prixLiv: number;//besh nzidu 3lih tva //shnuwa el fonction mta3 tva

  @Column()
  prixHliv: number;

  @Column()
  etatC: boolean;

  @Column()
  quantite:number;

  @Column()
  reference:string;

  @Column()
  dateBl: Date;
  



}





