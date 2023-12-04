import { Module } from '@nestjs/common';
import { PdfdownloadController } from './pdfdowload.controller';
import { PdfdownloadService } from './pdfdowload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Destinataire } from 'src/destinataires/destinataires.entity';
import { DestinatairesService } from 'src/destinataires/destinataires.service';
import { AuthService } from 'src/auth/auth.service';
import { ColisService } from 'src/colis/colis.service';
import { EmailService } from 'src/Email/email.service';
import { AuthModule } from 'src/auth/auth.module';
import { ColisModule } from 'src/colis/colis.module';
import { DestinatairesModule } from 'src/destinataires/destinataires.module';
import { UserModule } from 'src/user/user.module';
import { Colis } from 'src/colis/colis.entity';
import { User } from 'src/user/user.entity';
import { BlService } from 'src/bl/bl.service';
import { BlModule } from 'src/bl/bl.module';

@Module({
  imports: [TypeOrmModule.forFeature([Destinataire,Colis,User]),AuthModule,DestinatairesModule,ColisModule,UserModule,BlModule],
  controllers: [PdfdownloadController],
  providers: [PdfdownloadService,DestinatairesService,AuthService,ColisService,EmailService,BlService],
  exports:[PdfdownloadService],
})
export class PdfdowloadModule {}
