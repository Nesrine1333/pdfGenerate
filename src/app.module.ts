import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlService } from './bl/bl.service';
import { BlController } from './bl/bl.controller';
import { ColisService } from './colis/colis.service';
import { ColisController } from './colis/colis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bl } from './bl/Bl.entity';
import { Colis } from './colis/colis.entity';
import { BlModule } from './bl/bl.module';
import { ColisModule } from './colis/colis.module';
import { ConfigModule } from '@nestjs/config';
import { DestinatairesModule } from './destinataires/destinataires.module';
import { Destinataire } from './destinataires/destinataires.entity';
import { UploadGroupeService } from './upload-groupe/upload-groupe.service';
import { UploadGroupeController } from './upload-groupe/upload-groupe.controller';
import { MulterModule } from '@nestjs/platform-express';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PdfdowloadModule } from './pdfdowload/pdfdowload.module';
import { PdfdownloadService } from './pdfdowload/pdfdowload.service';


@Module({
  imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'baseBDL3',
        entities: [Bl,Colis,Destinataire, User],
        //synchronize: true, 
        //wakt database deja tabda creer naamel synchronise false 
        synchronize:false,
      }),
      BlModule,
      ColisModule,
      DestinatairesModule,
      MulterModule.register({
        dest: './uploadsExcels', // Set your upload directory
      }),
      UserModule,
      AuthModule,
      JwtModule,
      PdfdowloadModule

  ],
  controllers: [AppController, BlController, ColisController, UploadGroupeController, UserController],
  providers: [AppService, BlService, ColisService, UploadGroupeService, UserService,JwtService,PdfdownloadService],
})
export class AppModule {}
 