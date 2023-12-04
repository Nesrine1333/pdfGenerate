// bl.entity.ts
import { Colis } from 'src/colis/colis.entity';
import { Destinataire } from 'src/destinataires/destinataires.entity';
import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity({name: 'bl'})
export class Bl {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  refBl: string;//reference men win tji ?

  @Column()
  dateBl: Date;

  @ManyToOne(()=> Destinataire,(destinataire)=> destinataire.bonDeLiv)
  destinataire: Destinataire

  @ManyToOne(()=> User,(user)=> user.bonDeLiv)
  user: User


  @OneToOne(() => Colis)
  @JoinColumn({ name: 'colisId'  })
  colis: Colis;

}
