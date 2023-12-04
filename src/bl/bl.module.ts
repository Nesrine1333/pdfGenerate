import { Module } from '@nestjs/common';
import { BlController } from './bl.controller';
import { BlService } from './bl.service';
import { Bl } from './Bl.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Destinataire } from 'src/destinataires/destinataires.entity';
import { DestinatairesModule } from 'src/destinataires/destinataires.module';
import { User } from 'src/user/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { Colis } from 'src/colis/colis.entity';
import { ColisModule } from 'src/colis/colis.module';
import { AuthService } from 'src/auth/auth.service';
import { ColisService } from 'src/colis/colis.service';
import { EmailService } from 'src/Email/email.service';


@Module({

    imports: [TypeOrmModule.forFeature([Bl,Destinataire,User,Colis]),AuthModule,DestinatairesModule,ColisModule,UserModule],
    providers: [BlService,AuthService,ColisService,EmailService],
    controllers: [BlController],
    exports: [TypeOrmModule],


})
export class BlModule {}
